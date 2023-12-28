import {
  IAdminItem,
  IMenu,
  ISchemaLoginAdmin,
  ISelectionItem,
} from "@src/types";
import { DocumentClient } from "aws-sdk/clients/dynamodb.js";

/*
 ***************************************** BATCH *****************************************
 */

export const batchRequestParams = (
  items: any
): DocumentClient.BatchWriteItemInput => {
  return { RequestItems: { [`${process.env["YUM_YUM_TABLE"]}`]: items } };
};

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

/*
 ***************************************** POST *****************************************
 */

export const createPutRequestParams = (
  menu: IMenu
): DocumentClient.PutItemInput => {
  return {
    TableName: `${process.env["YUM_YUM_TABLE"]}`,
    Item: menu,
    ConditionExpression: "attribute_not_exists(PK)",
  };
};

export const createAdminAccountParams = (
  admin: IAdminItem
): DocumentClient.PutItemInput => {
  return {
    TableName: `${process.env["YUM_YUM_TABLE"]}`,
    Item: admin,
    ConditionExpression: "attribute_not_exists(PK)",
  };
};

/*
 ***************************************** QUERY MENU *****************************************
 */

export const menuPricesProjectExpression = (
  items: ISelectionItem[]
): string => {
  let projectExpression = "";
  items.forEach((item, i) => {
    if (i !== 0) {
      projectExpression += `,`;
    }
    projectExpression += `#p.${item.name.toLowerCase().replaceAll(" ", "")}`;
  });
  return projectExpression;
};

export const getMenuPricesParam = (
  projectExpression: string
): DocumentClient.GetItemInput => {
  return {
    TableName: `${process.env["YUM_YUM_TABLE"]}`,
    Key: {
      PK: `Menu`,
      SK: `Original`,
    },
    ProjectionExpression: projectExpression,
    ExpressionAttributeNames: { "#p": "prices" },
  };
};

export const getMenuParams = (): DocumentClient.GetItemInput => {
  return {
    TableName: `${process.env["YUM_YUM_TABLE"]}`,
    Key: {
      PK: `Menu`,
      SK: `Original`,
    },
    ProjectionExpression: "#i",
    ExpressionAttributeNames: { "#i": "items" },
  };
};

/*
 ***************************************** ADMIN LOGIN *****************************************
 */
export const getAdminAccountParams = (
  admin: ISchemaLoginAdmin
): DocumentClient.GetItemInput => {
  return {
    TableName: `${process.env["YUM_YUM_TABLE"]}`,
    Key: {
      PK: `Personal#${admin.username}`,
      SK: `Account`,
    },
  };
};
