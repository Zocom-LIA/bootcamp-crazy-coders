import { HttpResponse } from "aws-sdk";
import dynamoDBClient from "../core/dbClient.js";
import { DocumentClient, ItemList } from "aws-sdk/clients/dynamodb.js";
import { IOrderItem, YumYumMenuBase } from "@src/types/index.js";

export const exeBatchWrite = async (
  params: DocumentClient.BatchWriteItemInput
): Promise<HttpResponse> => {
  const dbResponse = await dynamoDBClient.batchWrite(params).promise();
  return dbResponse.$response.httpResponse;
};

export const exeBatchGetMenuItems = async (
  params: DocumentClient.BatchGetItemInput
): Promise<Partial<YumYumMenuBase>[]> => {
  let result = await dynamoDBClient.batchGet(params).promise();
  return result.Responses
    ? result.Responses[`${process.env["YUM_YUM_TABLE"]}`]
    : [];
};

export const execPutOrderRequest = async (
  params: DocumentClient.PutItemInput
): Promise<IOrderItem> => {
  await dynamoDBClient.put(params).promise();
  return params.Item as IOrderItem;
};

export const execQueryTable = async (
  params: AWS.DynamoDB.DocumentClient.QueryInput
): Promise<ItemList | undefined> => {
  return (await dynamoDBClient.query(params).promise()).Items;
};
