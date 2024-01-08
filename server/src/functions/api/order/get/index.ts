import { Handler, middyfy } from "@lib/middywrapper.js";
import { pathSchema, schema } from "@schema/pathParameterIdSchema";
import type { FromSchema } from "json-schema-to-ts";
import { failedResponse, createResponse } from "@util/response.js";
import { queryCustomerOrdersParams } from "@params/index.js";
import middyAppKeyObj from "@lib/middyAppKeyObj.js";
import { execQueryTable } from "@database/services";
import { HttpCode } from "@util/httpCodes";

const getCustomerOrder = async (orderId: string) => {
  const params = queryCustomerOrdersParams(orderId);
  return execQueryTable(params);
};

const orderById: Handler<void, FromSchema<typeof pathSchema>, void> = async (
  event
) => {
  try {
    let orderId = event.pathParameters.id;
    let order = await getCustomerOrder(orderId);
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

const handler = middyfy(orderById, null, middyAppKeyObj(), schema);
export { handler };
