import {
  IAdminItem,
  IMenu,
  ISchemaLoginAdmin,
  ISelectionItem,
  OrderStatus,
} from "@src/types";
import { DocumentClient } from "aws-sdk/clients/dynamodb.js";

/*
 ***************************************** BATCH *****************************************
 */

export const batchRequestParams = (
  items: any
): DocumentClient.BatchWriteItemInput => {
  return { RequestItems: { [`${process.env["YUM_YUM_TABLE"]}`]: items } };
};

export const putRequestItem = (data: any): any => {
  return {
    PutRequest: {
      Item: data,
    },
  };
};

export const deleteRequestItem = (data: any): any => {
  return {
    DeleteRequest: {
      Key: data,
    },
  };
};

/*
 ***************************************** TRANSACT UPDATE  *****************************************
 */

export const transactWriteParams = (
  transactItems: DocumentClient.TransactWriteItemList
): DocumentClient.TransactWriteItemsInput => {
  return {
    TransactItems: transactItems,
  };
};

export const transactAssingOrderParams = (
  pk: string,
  sk: string,
  staffMember: string,
  startTime: string
): DocumentClient.TransactWriteItem => {
  return {
    Update: {
      TableName: `${process.env["YUM_YUM_TABLE"]}`,
      Key: { PK: pk, SK: sk },
      UpdateExpression: "SET #s = :s, #at = :at, #st = :st",
      ExpressionAttributeNames: {
        "#s": "status",
        "#at": "assignedTo",
        "#st": "startTime",
      },
      ExpressionAttributeValues: {
        ":s": OrderStatus.ASSIGNED,
        ":at": staffMember,
        ":st": startTime,
      },
    },
  };
};

/*
 ***************************************** POST *****************************************
 */

export const createPutRequestParams = (
  menu: IMenu
): DocumentClient.PutItemInput => {
  return {
    TableName: `${process.env["YUM_YUM_TABLE"]}`,
    Item: menu,
    ConditionExpression: "attribute_not_exists(PK)",
  };
};

export const createAdminAccountParams = (
  admin: IAdminItem
): DocumentClient.PutItemInput => {
  return {
    TableName: `${process.env["YUM_YUM_TABLE"]}`,
    Item: admin,
    ConditionExpression: "attribute_not_exists(PK)",
  };
};

/*
 ***************************************** QUERY MENU *****************************************
 */

export const menuPricesProjectExpression = (
  items: ISelectionItem[]
): string => {
  let projectExpression = "";
  items.forEach((item, i) => {
    if (i !== 0) {
      projectExpression += `,`;
    }
    projectExpression += `#p.${item.name.toLowerCase().replaceAll(" ", "")}`;
  });
  return projectExpression;
};

export const getMenuPricesParam = (
  projectExpression: string
): DocumentClient.GetItemInput => {
  return {
    TableName: `${process.env["YUM_YUM_TABLE"]}`,
    Key: {
      PK: `Menu`,
      SK: `Original`,
    },
    ProjectionExpression: projectExpression,
    ExpressionAttributeNames: { "#p": "prices" },
  };
};

export const getMenuParams = (): DocumentClient.GetItemInput => {
  return {
    TableName: `${process.env["YUM_YUM_TABLE"]}`,
    Key: {
      PK: `Menu`,
      SK: `Original`,
    },
    ProjectionExpression: "#i",
    ExpressionAttributeNames: { "#i": "items" },
  };
};

/*
 ***************************************** QUERY ORDER *****************************************
 */

export const queryQueueOrdersParams =
  (): AWS.DynamoDB.DocumentClient.QueryInput => {
    return {
      TableName: `${process.env["YUM_YUM_TABLE"]}`,
      KeyConditionExpression: "#pk = :pk AND begins_with(#sk, :sk)",
      FilterExpression: "#st = :st",
      ProjectionExpression: "#ca,#sl,#cid,#oid,#st",
      ExpressionAttributeNames: {
        "#pk": "PK",
        "#sk": "SK",
        "#ca": "createdAt",
        "#sl": "selection",
        "#cid": "customerId",
        "#oid": "orderId",
        "#st": "status",
      },
      ExpressionAttributeValues: {
        ":pk": `Order`,
        ":sk": `InProgress`,
        ":st": `${OrderStatus.QUEUED}`,
      },
    };
  };

/*
 ***************************************** ADMIN LOGIN *****************************************
 */
export const getAdminAccountParams = (
  admin: ISchemaLoginAdmin
): DocumentClient.GetItemInput => {
  return {
    TableName: `${process.env["YUM_YUM_TABLE"]}`,
    Key: {
      PK: `Personal#${admin.username}`,
      SK: `Account`,
    },
  };
};
