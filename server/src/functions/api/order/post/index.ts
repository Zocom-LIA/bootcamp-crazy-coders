import { Handler, middyfy } from "@lib/middywrapper.js";
import { bodySchema, schema } from "@schema/orderSchema.js";
import type { FromSchema } from "json-schema-to-ts";
import {
  failedResponse,
  createResponse,
  orderSumError,
} from "../../../../util/response.js";
import { ISchemaCreateOrder, MenuItemBase } from "@yumtypes/index.js";
import { createOrderItemFrom } from "@yumtypes/index.js";
import middyAppKeyObj from "@lib/middyAppKeyObj.js";
import {
  menuItemsProjectExpression,
  queryMenuItemsParam,
} from "@src/params/index.js";
import { execQueryTable } from "@src/database/services/index.js";
import { ItemList } from "aws-sdk/clients/dynamodb.js";

/*
const post = async (order: ISchemaCreateOrder) => {
  let orderItem = createOrderItemFrom(order);
  let params = createPutOrderParams(orderItem);
  return execPutOrderRequest(params);
};*/

const validateSumBeforePurchase = async (
  order: ISchemaCreateOrder
): Promise<ItemList | undefined> => {
  let projectExpression = menuItemsProjectExpression(order.selection);
  let params = queryMenuItemsParam(projectExpression);
  let itemsList = await execQueryTable(params);
  itemsList?.forEach(({ item }) => {});
  //return execQueryTable(params);

  /*let totalSum: number = 0;
  order.selection.forEach((item) => {
    let index = attrmap.findIndex((e) => e.name === item.name);
    if (index > -1) {
      let m = attrmap[index];
      totalSum += m.price ? m.price * item.count : 0;
    }
  });
  return totalSum === order.totalSum;*/
};

const postOrder: Handler<FromSchema<typeof bodySchema>, void, void> = async (
  event
) => {
  try {
    let order: ISchemaCreateOrder = event.body;
    let result = await validateSumBeforePurchase(order);

    if (!result) {
      return failedResponse(orderSumError());
    }
    return createResponse(200, {
      order: "success",
      message: result,
    });
    //const postedOrder = await post(order);
    //return createResponse(200, { order: postedOrder });
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(postOrder, schema, middyAppKeyObj());
export { handler };
