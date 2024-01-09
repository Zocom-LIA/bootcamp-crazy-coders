import { Handler, middyfy } from '@lib/middywrapper.js';
import { bodySchema, schema } from '@schema/orderSchema.js';
import type { FromSchema } from 'json-schema-to-ts';
import {
  failedResponse,
  createResponse,
  orderSumError,
  orderItemsNotFoundError,
} from '@util/response.js';
import {
  ISchemaCreateOrder,
  YumYumBase,
  createKeysOnlyItem,
  createOrderItemFrom,
  createReceiptItemFrom,
  createReceiptResponseItemFrom,
} from '@yumtypes/index.js';
import middyAppKeyObj from '@lib/middyAppKeyObj.js';
import {
  batchRequestParams,
  deleteRequestItem,
  getMenuPricesParam,
  menuPricesProjectExpression,
  putRequestItem,
} from '@src/params/index.js';
import {
  exeBatchWrite,
  execGetMenuRequest,
} from '@src/database/services/index.js';
import { objectLength } from '@src/util/functions.js';
import { HttpError } from 'http-errors';
import { HttpCode } from '@src/util/httpCodes';
import { sendRefreshToClients } from '@src/util/ws.ts';

const validateSumBeforePurchase = async (
  order: ISchemaCreateOrder
): Promise<HttpError | undefined> => {
  let projectExpression = menuPricesProjectExpression(order.selection);
  let params = getMenuPricesParam(projectExpression);
  let itemsList = await execGetMenuRequest(params);
  if (order.selection.length !== objectLength(itemsList?.prices)) {
    return orderItemsNotFoundError();
  }
  let totalSum: number = 0;
  order.selection.forEach((item) => {
    let name = item.name.toLowerCase().replaceAll(' ', '');
    let itemSum = (itemsList?.prices[`${name}`] ?? 0) * item.count;
    totalSum += itemSum === item.totalPrice ? itemSum : 0;
  });

  return totalSum !== order.totalSum ? orderSumError() : undefined;
};

const deleteOrderAndReceipt = async (
  deleteOrderItem: YumYumBase,
  deleteReceiptItem: YumYumBase
) => {
  let params = batchRequestParams([
    deleteRequestItem(deleteOrderItem),
    deleteRequestItem(deleteReceiptItem),
  ]);
  return exeBatchWrite(params);
};

const putOrderAndReceipt = async (order: ISchemaCreateOrder, token: string) => {
  let orderItem = createOrderItemFrom(order);
  let receiptItem = createReceiptItemFrom(orderItem);
  orderItem.token = token;
  let params = batchRequestParams([
    putRequestItem(orderItem),
    putRequestItem(receiptItem),
  ]);
  let dbResponse = await exeBatchWrite(params);
  if (dbResponse.statusCode == HttpCode.OK) {
    return createResponse(
      HttpCode.OK,
      createReceiptResponseItemFrom(receiptItem)
    );
  } else {
    await deleteOrderAndReceipt(
      createKeysOnlyItem(orderItem),
      createKeysOnlyItem(receiptItem)
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
    const { order, token } = event.body as { order: ISchemaCreateOrder; token: string };
    let validationError = await validateSumBeforePurchase(order);
    if (validationError) {
      return failedResponse(validationError);
    }

    await sendRefreshToClients();
    return putOrderAndReceipt(order, token);
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(postOrder, schema, middyAppKeyObj());
export { handler };
