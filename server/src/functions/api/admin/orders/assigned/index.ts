import { Handler, middyfy } from "@lib/middywrapper.js";
import { failedResponse, createResponse } from "@util/response.js";
import { queryAssignedOrdersParams } from "@params/index.js";
import { execQueryTableForOrders } from "@database/services/index.js";
import { IJwtPayload, IOrderItem } from "@yumtypes/index.js";
import middyAuthTokenObj from "@lib/middyAuthTokenObj.js";
import { HttpCode } from "@util/httpCodes.js";
import { sortOrderBydate } from "@src/util/functions.js";

const getAssignedOrders = (
  staffmember: string
): Promise<IOrderItem[] | undefined> => {
  const params = queryAssignedOrdersParams(staffmember);
  return execQueryTableForOrders(params);
};

const pickAssignedOrders: Handler<void, void, void> = async (event) => {
  try {
    let payload = (event as any).auth as IJwtPayload;
    let result = await getAssignedOrders(payload.username);
    if (result == undefined) {
      return createResponse(HttpCode.BAD_REQUEST, {
        message: "Operation failed unexpectedly",
      });
    }
    if (result.length == 0) {
      return createResponse(HttpCode.ACCEPTED, {
        message: "You have no current orders assigned",
      });
    }
    sortOrderBydate(result);
    return createResponse(HttpCode.OK, result);
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(pickAssignedOrders, null, middyAuthTokenObj());
export { handler };
