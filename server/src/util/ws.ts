import { ApiGatewayManagementApi } from 'aws-sdk';
import database from '@database/core/dbClient.ts';

const apig = new ApiGatewayManagementApi({
  endpoint: process.env.APIG_ENDPOINT,
});

async function getAllConnectedClients() {
  const table = process.env.WS_TABLE as string;

  const { Items: connections } = await database
    .scan({ TableName: table })
    .promise();

  return connections?.map((connection) => connection.PK) ?? [];
}

async function sendMessage(connectionId: string, message: string) {
  await apig
    .postToConnection({
      ConnectionId: connectionId,
      Data: message,
    })
    .promise();
}

export async function sendRefreshToClients() {
  const connections = await getAllConnectedClients();

  for (const connection of connections) {
    await sendMessage(connection, 'refresh-data');
  }
}
