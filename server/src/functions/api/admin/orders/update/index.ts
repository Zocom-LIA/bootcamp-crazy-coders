import { Handler, middyfy } from '@lib/middywrapper.js';
import { bodySchema, schema } from '@schema/updateOrderSchema.js';
import type { FromSchema } from 'json-schema-to-ts';
import { failedResponse, createResponse } from '@util/response.js';
import {
  batchRequestParams,
  deleteRequestItem,
  getOrderParams,
  putRequestItem,
  updateOrderAsReadyParams,
} from '@params/index.js';
import {
  exeBatchWrite,
  execGetRequest,
  execUpdateOrderRequest,
} from '@database/services/index.js';
import {
  IOrderItem,
  ISchemaUpdateOrder,
  OrderStatus,
  PartialHttpResponse,
  createKeysOnlyItem,
  createOrderHistoryItemFrom,
} from '@yumtypes/index.js';
import middyAuthTokenObj from '@lib/middyAuthTokenObj.js';
import { HttpResponse } from 'aws-sdk';
import { HttpCode } from '@util/httpCodes';
import { calculateSecPassedBetweenDates } from '@util/functions';
import { sendRefreshToClients } from '@src/util/ws.ts';

const markAssignedOrdersAsReady = async (
  pk: string,
  sk: string
): Promise<HttpResponse> => {
  let endTime = new Date().toISOString();
  let params = updateOrderAsReadyParams(pk, sk, endTime);
  return execUpdateOrderRequest(params);
};

const moveReadyOrderToServedHistory = async (
  order: IOrderItem
): Promise<HttpResponse> => {
  let elapsedTimeInSec = calculateSecPassedBetweenDates(
    order.startTime,
    order.endTime
  );
  let deleteItem = createKeysOnlyItem(order);
  let orderHistoryItem = createOrderHistoryItemFrom(order, elapsedTimeInSec);
  let params = batchRequestParams([
    deleteRequestItem(deleteItem),
    putRequestItem(orderHistoryItem),
  ]);

  return exeBatchWrite(params);
};

const moveOrderToNextStep = async (
  order: IOrderItem | undefined
): Promise<PartialHttpResponse> => {
  if (!order) {
    return {
      statusCode: HttpCode.BAD_REQUEST,
      statusMessage: `Update order failed, no order matched provided keys`,
    };
  }

  switch (order.status) {
    case OrderStatus.ASSIGNED:
      return markAssignedOrdersAsReady(order.PK, order.SK);
    case OrderStatus.READY:
      return moveReadyOrderToServedHistory(order);
    default:
      return {
        statusCode: HttpCode.BAD_REQUEST,
        statusMessage: `Update order failed, current status is ${order.status}`,
      };
  }
};

const getCurrentOrder = async (order: ISchemaUpdateOrder) => {
  let params = getOrderParams(order.customerId, order.orderId);
  return execGetRequest(params);
};

const updateOrder: Handler<FromSchema<typeof bodySchema>, void, void> = async (
  event
) => {
  try {
    let orderSchema: ISchemaUpdateOrder = event.body;
    let order = (await getCurrentOrder(orderSchema)) as IOrderItem;
    let response = await moveOrderToNextStep(order);
    await sendRefreshToClients();
    return createResponse(response.statusCode, {
      message: response.statusMessage,
    });
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(updateOrder, schema, middyAuthTokenObj());
export { handler };
