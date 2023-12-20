import { HttpResponse } from "aws-sdk";
import dynamoDBClient from "../core/dbClient.js";
import { DocumentClient } from "aws-sdk/clients/dynamodb.js";
export const exeBatchWrite = async (
  params: DocumentClient.BatchWriteItemInput
): Promise<HttpResponse> => {
  const dbResponse = await dynamoDBClient.batchWrite(params).promise();
  return dbResponse.$response.httpResponse;
};
