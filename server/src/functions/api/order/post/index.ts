import { Handler, middyfy } from "@lib/middywrapper.js";
import { bodySchema, schema } from "@schema/orderSchema.js";
import type { FromSchema } from "json-schema-to-ts";
import {
  failedResponse,
  createResponse,
  orderSumError,
  orderItemsNotFoundError,
} from "@util/response.js";
import {
  ISchemaCreateOrder,
  YumYumBase,
  createKeysOnlyItem,
  createOrderItemFrom,
  createReciepeItemFrom,
  createReciepeResponseItemFrom,
} from "@yumtypes/index.js";
import middyAppKeyObj from "@lib/middyAppKeyObj.js";
import {
  batchRequestParams,
  deleteRequestItem,
  getMenuPricesParam,
  menuPricesProjectExpression,
  putRequestItem,
} from "@src/params/index.js";
import {
  exeBatchWrite,
  exeGetMenuRequest,
} from "@src/database/services/index.js";
import { objectLength } from "@src/util/functions.js";
import { HttpError } from "http-errors";
import { HttpCode } from "@src/util/httpCodes";

const validateSumBeforePurchase = async (
  order: ISchemaCreateOrder
): Promise<HttpError | undefined> => {
  let projectExpression = menuPricesProjectExpression(order.selection);
  let params = getMenuPricesParam(projectExpression);
  let itemsList = await exeGetMenuRequest(params);
  if (order.selection.length !== objectLength(itemsList?.prices)) {
    return orderItemsNotFoundError();
  }
  let totalSum: number = 0;
  order.selection.forEach((item) => {
    let name = item.name.toLowerCase().replaceAll(" ", "");
    let itemSum = itemsList?.prices[`${name}`] ?? 0 * item.count;
    totalSum += itemSum === item.totalPrice ? itemSum : 0;
  });

  return totalSum !== order.totalSum ? orderSumError() : undefined;
};

const deleteOrderAndReciepe = async (
  deleteOrderItem: YumYumBase,
  deleteReciepeItem: YumYumBase
) => {
  let params = batchRequestParams([
    deleteRequestItem(deleteOrderItem),
    deleteRequestItem(deleteReciepeItem),
  ]);
  return exeBatchWrite(params);
};

const putOrderAndReciepe = async (order: ISchemaCreateOrder) => {
  let orderItem = createOrderItemFrom(order);
  let reciepeItem = createReciepeItemFrom(orderItem);
  let params = batchRequestParams([
    putRequestItem(orderItem),
    putRequestItem(reciepeItem),
  ]);
  let dbResponse = await exeBatchWrite(params);
  if (dbResponse.statusCode == HttpCode.OK) {
    return createResponse(
      HttpCode.OK,
      createReciepeResponseItemFrom(reciepeItem)
    );
  } else {
    await deleteOrderAndReciepe(
      createKeysOnlyItem(orderItem),
      createKeysOnlyItem(reciepeItem)
    );
    return createResponse(dbResponse.statusCode, {
      message: dbResponse.statusMessage,
    });
  }
};

const postOrder: Handler<FromSchema<typeof bodySchema>, void, void> = async (
  event
) => {
  try {
    let order: ISchemaCreateOrder = event.body;
    let validationError = await validateSumBeforePurchase(order);
    if (validationError) {
      return failedResponse(validationError);
    }
    return putOrderAndReciepe(order);
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(postOrder, schema, middyAppKeyObj());
export { handler };
