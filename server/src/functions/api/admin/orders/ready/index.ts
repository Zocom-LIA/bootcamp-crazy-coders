import { Handler, middyfy } from "@lib/middywrapper.js";
import { bodySchema, schema } from "@schema/updateOrderSchema.js";
import type { FromSchema } from "json-schema-to-ts";
import { failedResponse, createResponse } from "@util/response.js";
import { updateOrderParams } from "@params/index.js";
import { execUpdateOrderRequest } from "@database/services/index.js";
import {
  IJwtPayload,
  ISchemaUpdateOrder,
  IOrderItem,
} from "@yumtypes/index.js";
import { HttpCode } from "@util/httpCodes.js";
import middyPathParametersIdAndAuthTokenObj from "@lib/middyPathParametersIdAndAuthTokenObj.js";

const markAssignedOrdersAsReady = async (
  customerId: string,
  orderId: string,
  status: string,
  staffmember: string
): Promise<IOrderItem | undefined> => {
  let params = updateOrderParams(customerId, orderId, status, staffmember);
  return execUpdateOrderRequest(params);
};

const updateOrder: Handler<FromSchema<typeof bodySchema>, void, void> = async (
  event
) => {
  try {
    /*let order: ISchemaUpdateOrder = event.body;
    let payload = (event as any).auth as IJwtPayload;
    let orderId = (event.pathParameters as any).id;
    let result = await markAssignedOrdersAsReady(
      order.customerId,
      orderId,
      order.status,
      payload.username
    );
    return createResponse(HttpCode.OK, result);*/
    return createResponse(HttpCode.OK, "Almost finnished");
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(
  updateOrder,
  schema,
  middyPathParametersIdAndAuthTokenObj()
);
export { handler };
