import { HttpResponse } from 'aws-sdk';
import dynamoDBClient from '../core/dbClient.js';
import { DocumentClient, ItemList } from 'aws-sdk/clients/dynamodb.js';
import { IOrderItem, PartialAdminItem, PartialMenu } from '@src/types/index.js';
import * as admin from 'firebase-admin';
import { XMLHttpRequest } from "aws-sdk/lib/http_response.js";

export const exeBatchWrite = async (
  params: DocumentClient.BatchWriteItemInput
): Promise<HttpResponse> => {
  let dbResponse = await dynamoDBClient.batchWrite(params).promise();
  return dbResponse.$response.httpResponse;
};

export const execTransactWrite = async (
  params: DocumentClient.TransactWriteItemsInput
): Promise<HttpResponse> => {
  let dbResponse = await dynamoDBClient.transactWrite(params).promise();
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
  return (await dynamoDBClient.get(params).promise()).Item;
};

export const execQueryTable = async (
  params: DocumentClient.QueryInput
): Promise<ItemList | undefined> => {
  return (await dynamoDBClient.query(params).promise()).Items;
};

export const execDeleteRequest = async (
  params: DocumentClient.DeleteItemInput
): Promise<DocumentClient.AttributeMap | undefined> => {
  return await dynamoDBClient.delete(params).promise();
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

export const execUpdateOrderRequest = async (
  params: DocumentClient.UpdateItemInput
): Promise<HttpResponse> => {
  const serviceAccount = require('yygs-crazy-coders-firebase-adminsdk-aeb0w-a52ef8684f.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  
  const messaging = admin.messaging();

  try {
    const dbResponse: DocumentClient.UpdateItemOutput = await dynamoDBClient.update(params).promise();
    const fcmToken = dbResponse.Attributes?.token;

    // Send FCM notification
    const userId = 'user123'; // Replace with the actual user ID or token
    const message: admin.messaging.Message = {
      data: {
        title: 'YYGS - Your Order Ready for Pickup',
        body: 'Have a nice meal!',
      },
      token: fcmToken,
    };

    await messaging.send(message);

    // Return a more complete response
    const successResponse: HttpResponse = {
      statusCode: 200,
      headers: {},  // Add your headers if necessary
      statusMessage: 'OK',
      createUnbufferedStream: () => { return {} as XMLHttpRequest },  // Adjust this line based on your requirements
      streaming: false,  // Modify based on your requirements
      body: JSON.stringify({ message: 'Order updated successfully' }),
    };

    return successResponse;
  } catch (error) {
    // Handle errors
    console.error('Error updating order:', error);

    // Return an error response
    const errorResponse: HttpResponse = {
      statusCode: 500,
      headers: {},  // Add your headers if necessary
      statusMessage: 'Internal Server Error',
      createUnbufferedStream: () => { return {} as XMLHttpRequest },  // Adjust this line based on your requirements
      streaming: false,  // Modify based on your requirements
      body: JSON.stringify({ error: 'Failed to update order' }),
    };

    return errorResponse;
  }
};