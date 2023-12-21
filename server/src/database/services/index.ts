import { HttpResponse } from "aws-sdk";
import dynamoDBClient from "../core/dbClient.js";
import { DocumentClient, ItemList } from "aws-sdk/clients/dynamodb.js";

export const exeBatchWrite = async (
  params: DocumentClient.BatchWriteItemInput
): Promise<HttpResponse> => {
  const dbResponse = await dynamoDBClient.batchWrite(params).promise();
  return dbResponse.$response.httpResponse;
};

export const execPutMenuRequest = async (
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
