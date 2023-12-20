import { IOrderItem, ISelectionItem } from "@src/types";
import { DocumentClient } from "aws-sdk/clients/dynamodb.js";

/*
 ***************************************** BATCH *****************************************
 */

export const batchWriteParams = (
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
      Item: data,
    },
  };
};

export const batchGetMenuItemParams = (
  items: ISelectionItem[]
): DocumentClient.BatchGetItemInput => {
  return {
    RequestItems: {
      [`${process.env["YUM_YUM_TABLE"]}`]: {
        Keys: items.map((item) => ({
          ["PK"]: `Menu`,
          ["SK"]: `${item.type}#${item.name}`,
        })),
        ProjectionExpression: "#n,#p",
        ExpressionAttributeNames: {
          "#p": "price",
          "#n": "name",
        },
      },
    },
  };
};

/*
 ***************************************** POST *****************************************
 */

export const createPutOrderParams = (
  order: IOrderItem
): DocumentClient.PutItemInput => {
  return {
    TableName: `${process.env["YUM_YUM_TABLE"]}`,
    Item: order,
  };
};

/*
 ***************************************** QUERY MENU *****************************************
 */

export const queryMenuParam = (): AWS.DynamoDB.DocumentClient.QueryInput => {
  return {
    TableName: `${process.env["YUM_YUM_TABLE"]}`,
    KeyConditionExpression: "#pk = :pk",
    ExpressionAttributeNames: { "#pk": "PK" },
    ExpressionAttributeValues: {
      ":pk": `Menu`,
    },
  };
};

export const queryMenuItemParam = (
  type: string,
  name: string,
  projectionExpr: string
): AWS.DynamoDB.DocumentClient.QueryInput => {
  return {
    TableName: `${process.env["YUM_YUM_TABLE"]}`,
    ProjectionExpression: projectionExpr,
    KeyConditionExpression: "#pk = :pk AND #sk = :sk",
    ExpressionAttributeNames: { "#pk": "PK", "#sk": "SK" },
    ExpressionAttributeValues: {
      ":pk": `Menu`,
      ":sk": `${type}#${name}`,
    },
  };
};
