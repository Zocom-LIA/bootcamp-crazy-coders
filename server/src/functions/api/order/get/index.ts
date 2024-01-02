import { DynamoDB } from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const dynamoDB = new DynamoDB.DocumentClient();
const tableName = 'YourDynamoDBTableName';

interface LambdaEvent extends APIGatewayProxyEvent {
  pathParameters: {
    orderId: string;
  };
}

export const handler = async (event: LambdaEvent): Promise<APIGatewayProxyResult> => {
  try {
    const orderId: string = event.pathParameters.orderId;

    const params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: `${process.env["YUM_YUM_TABLE"]}`,
      Key: {
        orderId: orderId,
      },
    };

    const result = await dynamoDB.get(params).promise();

    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Order not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' }),
    };
  }
};
