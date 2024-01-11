import type { APIGatewayProxyEvent, Context } from 'aws-lambda';
import {
  execDeleteRequest,
  execPutRequest,
} from '@src/database/services/index.ts';

// https://github.com/aws-samples/simple-websockets-chat-app
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  const {
    body,
    requestContext: { connectionId, routeKey },
  } = event;
  const table = process.env.WS_TABLE as string;

  const connect = async () => {
    await execPutRequest({
      TableName: table,
      Item: { PK: connectionId },
    });
  };

  const disconnect = async () => {
    await execDeleteRequest({
      TableName: table,
      Key: { PK: connectionId },
    });
  };

  switch (routeKey) {
    case '$connect':
      await connect();
      break;

    case '$disconnect':
      await disconnect();
      break;
  }

  return {
    statusCode: 200,
  };
};
