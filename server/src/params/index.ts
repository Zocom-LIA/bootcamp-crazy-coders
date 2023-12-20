import { DocumentClient } from "aws-sdk/clients/dynamodb.js";

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

export const batchWriteParams = (
  items: any
): DocumentClient.BatchWriteItemInput => {
  return { RequestItems: { [`${process.env["YUM_YUM_TABLE"]}`]: items } };
};
