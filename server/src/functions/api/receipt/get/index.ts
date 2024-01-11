import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
const dynamoDB = new DynamoDB.DocumentClient();

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const orderId: string = event.queryStringParameters?.orderId || '';

    if (!orderId) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5173',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          message: 'Missing orderId in the query parameters',
        }),
      };
    }

    const params: DynamoDB.DocumentClient.QueryInput = {
      TableName: `${process.env['YUM_YUM_TABLE']}`,
      KeyConditionExpression: 'PK = :pk and SK = :sk', // Using begins_with to match the prefix
      ExpressionAttributeValues: {
        ':pk': 'Receipt',
        ':sk': `${orderId}`,
      },
    };

    const result = await dynamoDB.query(params).promise();

    if (!result) {
      return {
        statusCode: 404,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5173',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ message: 'Order not found' }),
      };
    }
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify({ message: 'Internal server error:' + error }),
    };
  }
};
