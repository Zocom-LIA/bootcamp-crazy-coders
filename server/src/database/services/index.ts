import { HttpResponse } from "aws-sdk";
import dynamoDBClient from "../core/dbClient.js";
import { DocumentClient, ItemList } from "aws-sdk/clients/dynamodb.js";
import { IOrderItem, PartialAdminItem, PartialMenu } from "@src/types/index.js";

export const exeBatchWrite = async (
  params: DocumentClient.BatchWriteItemInput
): Promise<HttpResponse> => {
  let dbResponse = await dynamoDBClient.batchWrite(params).promise();
  return dbResponse.$response.httpResponse;
};

export const execTransactWrite = async (
  params: DocumentClient.TransactWriteItemsInput
): Promise<HttpResponse> => {
  const dbResponse = await dynamoDBClient.transactWrite(params).promise();
  return dbResponse.$response.httpResponse;
};

export const execPutRequest = async (
  params: DocumentClient.PutItemInput
): Promise<HttpResponse> => {
  let dbResponse = await dynamoDBClient.put(params).promise();
  return dbResponse.$response.httpResponse;
};

export const execGetRequest = async (
  params: DocumentClient.GetItemInput
): Promise<DocumentClient.AttributeMap | undefined> => {
  return dynamoDBClient.get(params).promise();
};

export const execQueryTable = async (
  params: AWS.DynamoDB.DocumentClient.QueryInput
): Promise<ItemList | undefined> => {
  return (await dynamoDBClient.query(params).promise()).Items;
};

export const execGetMenuRequest = async (
  params: DocumentClient.GetItemInput
): Promise<PartialMenu | undefined> => {
  let { Item } = await dynamoDBClient.get(params).promise();
  return Item as PartialMenu;
};

export const execGetAdminRequest = async (
  params: DocumentClient.GetItemInput
): Promise<PartialAdminItem> => {
  let { Item } = await dynamoDBClient.get(params).promise();
  return Item as PartialAdminItem;
};

export const execQueryTableForOrders = async (
  params: AWS.DynamoDB.DocumentClient.QueryInput
): Promise<IOrderItem[] | undefined> => {
  return (await dynamoDBClient.query(params).promise()).Items as IOrderItem[];
};
