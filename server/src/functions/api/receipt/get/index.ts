import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
    createOrderItemFrom,
    createReceiptItemFrom,
    createReceiptResponseItemFrom,
  } from "@yumtypes/index.js";
const dynamoDB = new DynamoDB.DocumentClient();

interface LambdaEvent extends APIGatewayProxyEvent {
  pathParameters: {
    orderId: string;
  };
}

interface IReceiptItem {
    PK: string;
    SK: string;
    orderId: string;
    customerId: string;
    selection: {
      name: string;
      count: number;
      totalPrice: number;
    }[];
    createdAt: string;
    totalSum: number;
  }

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
      const orderId: string = event.queryStringParameters?.orderId || '';
      console.log(orderId);
  
      if (!orderId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Missing orderId in the query parameters' }),
        };
      }
  
      const params: DynamoDB.DocumentClient.QueryInput = {
        TableName: `${process.env["YUM_YUM_TABLE"]}`,
        KeyConditionExpression: 'PK = :pk and begins_with(SK, :skPrefix)', // Using begins_with to match the prefix
        ExpressionAttributeValues: {
          ':pk': 'Order',
          ':skPrefix': `InProgress#optional#${orderId}`,
        },
      };
  
      const result = await dynamoDB.query(params).promise();
      
      if (!result) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Order not found' }),
        };
      }
      return {
        statusCode: 200,
        body: JSON.stringify(result),
      };
    } catch (error) {
      console.error('Error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Internal server error:' + error}),
      };
    }
  };
  