import AWS from "aws-sdk";

const dynamoDBClient = new AWS.DynamoDB.DocumentClient();

export default dynamoDBClient;
