import { nanoid } from "nanoid";

export const baseItemProperties = () => {
  return {
    id: nanoid(),
    createdAt: new Date().toISOString(),
  };
};

/*
 **** REQUEST ITEMS ****
 */

export type PutRequestItem = {
  PutRequest: {
    Item: YumYumBase;
  };
};

/*
 **** MIDDY ERROR ****
 */
export interface MiddyError {
  name: string;
  statusCode: number;
  status: number;
  expose: boolean;
  cause: { package: string; data: [] };
}

export interface MiddyErrorObject {
  instancePath: string;
  schemaPath: string;
  keyword: string;
  params: {};
  message: string;
}

/*
 **** YUM YUM TABLE ****
 */

export type YumYumBase = {
  PK: string;
  SK: string;
};

/*
 **** MENU ****
 */

export const createMenuItemFrom = (menu: IMenuItem): IMenu => {
  return {
    PK: `YumYum`,
    SK: `Menu`,
    items: menu,
  };
};

export interface IMenu extends YumYumBase {
  items: IMenuItem;
}

export interface IMenuItem {
  wontons: IWontonItem[];
  dip: IDipItem[];
}

export type IWontonItem = {
  id: string;
  name: string;
  desc: string;
  ingredients: string[];
  price: number;
  cookingTime: number;
};

export type IDipItem = {
  id: string;
  name: string;
  desc: string;
  price: number;
};

export type PartialMenu = Omit<IMenu, "PK" | "SK">;

/*
 **** ORDER ****
 */
export const createOrderItemFrom = (order: ISchemaCreateOrder): IOrderItem => {
  let base = baseItemProperties();
  return {
    PK: `Customer#${order.customerId}`,
    SK: `Order#${base.id}Created#${base.createdAt}`,
    GSI_PK_1: `Order`,
    GSI_SK_1: `Ongoing#${base.id}#${order.customerId}`,
    id: order.customerId,
    selection: order.selection,
    createdAt: base.createdAt,
    totalSum: order.totalSum,
  };
};

export interface ISelectionItem {
  name: string;
  type: string;
  count: number;
  totalPrice: number;
}

export interface IOrderItem extends YumYumBase {
  GSI_PK_1: string;
  GSI_SK_1: string;
  id: string;
  selection: ISelectionItem[];
  totalSum: number;
  createdAt: string;
}

/*
 **** ADMIN PERSONAL ****
 */

export const createAdminItemFrom = (
  admin: PartialAdminItem,
  password: string
): IAdminItem => {
  let base = baseItemProperties();
  return {
    PK: `Personal#${admin.username}`,
    SK: `Account`,
    email: admin.email,
    id: admin.id,
    username: admin.username,
    firstname: admin.firstname,
    lastname: admin.lastname,
    password: password,
    createdAccountAt: base.createdAt,
  };
};

export interface IAdminItem extends YumYumBase {
  email: string;
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  createdAccountAt: string;
}

export type PartialAdminItem = Omit<IAdminItem, "PK" | "SK">;

/*
 **** JWT TOKEN ****
 */

export const createPayload = (id: string, username: string): IPayload => {
  return {
    id: id,
    username: username,
  };
};

export interface IJwtPayload {
  id: string;
  username: string;
}

export interface IPayload {
  id: string;
  username: string;
}

export interface IJwtToken {
  token: string;
  tokenExpiration: string;
}

/*
 **** SCHEMA ****
 */

export interface ISchemaCreateOrder {
  customerId: string;
  selection: ISelectionItem[];
  totalSum: number;
}

export interface ISchemaLoginAdmin {
  username: string;
  password: string;
}
