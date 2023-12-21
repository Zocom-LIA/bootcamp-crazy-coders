import { IMenu } from "@src/types";
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

/*
 ***************************************** POST *****************************************
 */

export const createPutMenuParams = (
  menu: IMenu
): DocumentClient.PutItemInput => {
  return {
    TableName: `${process.env["YUM_YUM_TABLE"]}`,
    Item: menu,
  };
};

/*
 ***************************************** QUERY MENU *****************************************
 */

export const queryMenuParam = (): AWS.DynamoDB.DocumentClient.QueryInput => {
  return {
    TableName: `${process.env["YUM_YUM_TABLE"]}`,
    KeyConditionExpression: "#pk = :pk AND #sk = :sk",
    ExpressionAttributeNames: { "#pk": "PK", "#sk": "SK" },
    ExpressionAttributeValues: {
      ":pk": `Menu`,
      ":sk": `Original`,
    },
  };
};
