import { Handler, middyfy } from "@lib/middywrapper.js";
import { bodySchema, schema } from "@schema/orderSchema.js";
import type { FromSchema } from "json-schema-to-ts";
import {
  failedResponse,
  createResponse,
  orderSumError,
} from "../../../../util/response.js";
import { ISchemaCreateOrder } from "@yumtypes/index.js";
import { batchGetMenuItemParams, createPutOrderParams } from "@params/index.js";
import {
  exeBatchGetMenuItems,
  execPutOrderRequest,
} from "@database/services/index.js";
import { createOrderItemFrom } from "@yumtypes/index.js";
import middyAppKeyObj from "@lib/middyAppKeyObj.js";

const post = async (order: ISchemaCreateOrder) => {
  let orderItem = createOrderItemFrom(order);
  let params = createPutOrderParams(orderItem);
  return execPutOrderRequest(params);
};

const validateSumBeforePurchase = async (
  order: ISchemaCreateOrder
): Promise<boolean> => {
  let params = batchGetMenuItemParams(order.selection);
  let attrmap = await exeBatchGetMenuItems(params);

  let totalSum: number = 0;
  order.selection.forEach((item) => {
    let index = attrmap.findIndex((e) => e.name === item.name);
    if (index > -1) {
      let m = attrmap[index];
      totalSum += m.price ? m.price * item.count : 0;
    }
  });
  return totalSum === order.totalSum;
};

const postOrder: Handler<FromSchema<typeof bodySchema>, void, void> = async (
  event
) => {
  try {
    let order: ISchemaCreateOrder = event.body;
    if (!(await validateSumBeforePurchase(order))) {
      return failedResponse(orderSumError());
    }
    return createResponse(200, {
      order: "success",
      message: "Reciepe in the making....",
    });
    //const postedOrder = await post(order);
    //return createResponse(200, { order: postedOrder });
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(postOrder, schema, middyAppKeyObj());
export { handler };
