import { Handler, middyfy } from "@lib/middywrapper.js";
import { bodySchema, schema } from "@schema/updateOrderSchema.js";
import type { FromSchema } from "json-schema-to-ts";
import { failedResponse, createResponse } from "@util/response.js";
import { updateOrderParams } from "@params/index.js";
import { execUpdateOrderRequest } from "@database/services/index.js";
import { IJwtPayload, ISchemaUpdateOrder } from "@yumtypes/index.js";
import middyAuthTokenObj from "@lib/middyAuthTokenObj.js";
import { HttpResponse } from "aws-sdk";

const markAssignedOrdersAsReady = async (
  customerId: string,
  orderId: string,
  staffmember: string
): Promise<HttpResponse> => {
  let endTime = new Date().toISOString();
  let params = updateOrderParams(customerId, orderId, staffmember, endTime);
  return execUpdateOrderRequest(params);
};

const updateOrder: Handler<FromSchema<typeof bodySchema>, void, void> = async (
  event
) => {
  try {
    let order: ISchemaUpdateOrder = event.body;
    let payload = (event as any).auth as IJwtPayload;
    let response = await markAssignedOrdersAsReady(
      order.customerId,
      order.orderId,
      payload.username
    );
    return createResponse(response.statusCode, {
      message: response.statusMessage,
    });
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(updateOrder, schema, middyAuthTokenObj());
export { handler };
