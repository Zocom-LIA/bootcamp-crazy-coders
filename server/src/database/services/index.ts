import { HttpResponse } from "aws-sdk";
import dynamoDBClient from "../core/dbClient.js";
import { DocumentClient, ItemList } from "aws-sdk/clients/dynamodb.js";
import { PartialAdminItem, PartialMenu } from "@src/types/index.js";

export const exeBatchWrite = async (
  params: DocumentClient.BatchWriteItemInput
): Promise<HttpResponse> => {
  let dbResponse = await dynamoDBClient.batchWrite(params).promise();
  return dbResponse.$response.httpResponse;
};

export const execPutRequest = async (
  params: DocumentClient.PutItemInput
): Promise<HttpResponse> => {
  let dbResponse = await dynamoDBClient.put(params).promise();
  return dbResponse.$response.httpResponse;
};

export const execQueryTable = async (
  params: AWS.DynamoDB.DocumentClient.QueryInput
): Promise<ItemList | undefined> => {
  return (await dynamoDBClient.query(params).promise()).Items;
};

export const exeGetAdminRequest = async (
  params: DocumentClient.GetItemInput
): Promise<PartialAdminItem> => {
  let { Item } = await dynamoDBClient.get(params).promise();
  return Item as PartialAdminItem;
};

export const exeGetMenuRequest = async (
  params: DocumentClient.GetItemInput
): Promise<PartialMenu | undefined> => {
  let { Item } = await dynamoDBClient.get(params).promise();
  return Item as PartialMenu;
};
