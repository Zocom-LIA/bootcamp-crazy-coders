import { Handler, middyfy } from "@lib/middywrapper.js";
import { bodySchema, schema } from "@schema/orderSchema.js";
import type { FromSchema } from "json-schema-to-ts";
import {
  failedResponse,
  createResponse,
  orderSumError,
} from "@util/response.js";
import { ISchemaCreateOrder } from "@yumtypes/index.js";
import middyAppKeyObj from "@lib/middyAppKeyObj.js";
import {
  getMenuPricesParam,
  menuPricesProjectExpression,
} from "@src/params/index.js";
import { exeGetMenuRequest } from "@src/database/services/index.js";
import { objectLength } from "@src/util/functions.js";

const validateSumBeforePurchase = async (
  order: ISchemaCreateOrder
): Promise<boolean> => {
  let projectExpression = menuPricesProjectExpression(order.selection);
  let params = getMenuPricesParam(projectExpression);
  let itemsList = await exeGetMenuRequest(params);
  if (order.selection.length !== objectLength(itemsList?.prices)) {
    return false;
  }
  let totalSum: number = 0;
  order.selection.forEach((item) => {
    let name = item.name.toLowerCase().replaceAll(" ", "");
    totalSum += (itemsList?.prices[`${name}`] ?? 0) * item.count;
  });
  return totalSum === order.totalSum;
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
