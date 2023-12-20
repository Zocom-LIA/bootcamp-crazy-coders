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

export type YumYumMenuBase = {
  PK: string;
  SK: string;
  id: string;
  name: string;
  desc: string;
  price: number;
};

/*
 **** MENU ****
 */

export const createWontonItemFrom = (
  wonton: PartialWontonItem
): IWontonItem => {
  let base = baseItemProperties();
  return {
    PK: `Menu`,
    SK: `Wonton#${wonton.name}`,
    id: base.id,
    name: wonton.name,
    desc: wonton.desc,
    ingredients: wonton.ingredients,
    price: wonton.price,
    cookingTime: wonton.cookingTime,
  };
};

export const createDipItemFrom = (dip: PartialDipItem): IDipItem => {
  let base = baseItemProperties();
  return {
    PK: `Menu`,
    SK: `Dip#${dip.name}`,
    id: base.id,
    name: dip.name,
    desc: dip.desc,
    price: dip.price,
  };
};

export interface IWontonItem extends YumYumBase {
  id: string;
  name: string;
  desc: string;
  ingredients: string[];
  price: number;
  cookingTime: number;
}

export interface IDipItem extends YumYumBase {
  id: string;
  name: string;
  desc: string;
  price: number;
}

export type PartialWontonItem = Omit<IWontonItem, "PK" | "SK">;
export type PartialDipItem = Omit<IDipItem, "PK" | "SK">;

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
 **** SCHEMA ****
 */

export interface ISchemaCreateOrder {
  customerId: string;
  selection: ISelectionItem[];
  totalSum: number;
}
