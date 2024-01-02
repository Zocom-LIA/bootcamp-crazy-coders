import { Handler, middyfy } from "@lib/middywrapper.js";
import { failedResponse, createResponse } from "@util/response.js";
import {
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

const pickQueuedOrders: Handler<void, void, void> = async (event) => {
  try {
    let payload = (event as any).auth as IJwtPayload;
    let queuedOrders = await getQueuedOrders();
    if (queuedOrders == undefined) {
      return createResponse(HttpCode.BAD_REQUEST, {
        message: "Operation failed unexpectedly",
      });
    }
    if (queuedOrders.length == 0) {
      return createResponse(HttpCode.ACCEPTED, {
        message: "No current orders in queue.",
      });
    }
    let dbResponse = await markQueuedOrdersAsAssigned(
      queuedOrders,
      payload.username
    );
    if (dbResponse.statusCode !== HttpCode.OK) {
      return createResponse(dbResponse.statusCode, {
        message: dbResponse.statusMessage,
      });
    }
    return createResponse(HttpCode.OK, queuedOrders);
  } catch (error) {
    return failedResponse(error);
  }
};

const handler = middyfy(pickQueuedOrders, null, middyAuthTokenObj());
export { handler };
