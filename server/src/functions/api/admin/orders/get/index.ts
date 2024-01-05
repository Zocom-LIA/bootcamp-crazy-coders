import { Handler, middyfy } from "@lib/middywrapper.js";
import { failedResponse, createResponse } from "@util/response.js";
import {
  queryAssignedOrdersParams,
  queryQueueOrdersParams,
  transactAssingOrderParams,
  transactWriteParams,
} from "@src/params/index.js";
import {
  execQueryTableForOrders,
  execTransactWrite,
} from "@database/services/index.js";
import { IJwtPayload, IOrderItem } from "@yumtypes/index.js";
import middyAuthTokenObj from "@lib/middyAuthTokenObj.js";
import { HttpCode } from "@util/httpCodes.js";
import { HttpResponse } from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { sortOrderBydate } from "@src/util/functions";

const markQueuedOrdersAsAssigned = async (
  orders: IOrderItem[],
  staffMember: string
): Promise<HttpResponse> => {
  let transactItems: DocumentClient.TransactWriteItemList = [];
  let startTime = new Date().toISOString();
  orders.forEach((order) => {
    transactItems.push(
      transactAssingOrderParams(order.PK, order.SK, staffMember, startTime)
    );
    order.assignedTo = staffMember;
    order.startTime = startTime;
  });
  let transactParams = transactWriteParams(transactItems);
  return execTransactWrite(transactParams);
};

const getQueuedOrders = (): Promise<IOrderItem[] | undefined> => {
  const params = queryQueueOrdersParams();
  return execQueryTableForOrders(params);
};

const getAssignedOrders = (
  staffmember: string
): Promise<IOrderItem[] | undefined> => {
  const params = queryAssignedOrdersParams(staffmember);
  return execQueryTableForOrders(params);
};

const pickQueuedOrders: Handler<void, void, void> = async (event) => {
  try {
    let payload = (event as any).auth as IJwtPayload;
    let queuedOrders = await getQueuedOrders();
    if (queuedOrders && queuedOrders.length) {
      await markQueuedOrdersAsAssigned(queuedOrders, payload.username);
    }
    let allOrders = await getAssignedOrders(payload.username);
    if (allOrders == undefined) {
      return createResponse(HttpCode.BAD_REQUEST, {
        message: "Operation failed unexpectedly",
      });
    }
    if (!allOrders.length) {
      return createResponse(HttpCode.ACCEPTED, {
        message: "You have no current orders assigned",
      });
    }
    sortOrderBydate(allOrders);
    return createResponse(HttpCode.OK, allOrders);
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(pickQueuedOrders, null, middyAuthTokenObj());
export { handler };
