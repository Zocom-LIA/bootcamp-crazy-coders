import { Handler, middyfy } from "@lib/middywrapper.js";
import { pathSchema, schema } from "@schema/pathParameterIdSchema";
import type { FromSchema } from "json-schema-to-ts";
import { failedResponse, createResponse } from "@util/response.js";
import { queryCustomerOrdersParams } from "@params/index.js";
import middyAppKeyObj from "@lib/middyAppKeyObj.js";
import { execQueryTable } from "@database/services";
import { HttpCode } from "@util/httpCodes";

const getCustomerOrders = async (customerId: string) => {
  const params = queryCustomerOrdersParams(customerId);
  return execQueryTable(params);
};

const ongoingOrders: Handler<
  void,
  FromSchema<typeof pathSchema>,
  void
> = async (event) => {
  try {
    let customerId = event.pathParameters.id;
    let orders = await getCustomerOrders(customerId);
    if (!orders) {
      return createResponse(HttpCode.BAD_REQUEST, {
        message: "Failed to fetch orders",
      });
    }
    return createResponse(HttpCode.OK, orders);
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(ongoingOrders, null, middyAppKeyObj(), schema);
export { handler };
