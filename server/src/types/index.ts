import { nanoid } from 'nanoid';

export const baseItemProperties = () => {
  return {
    id: nanoid(),
    createdAt: new Date().toISOString(),
  };
};

/*
 **************************************** MIDDY ERROR ****************************************
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
 **************************************** YUM YUM TABLE ****************************************
 */

export type YumYumBase = {
  PK: string;
  SK: string;
};

export const createKeysOnlyItem = (item: YumYumBase) => {
  return {
    PK: item.PK,
    SK: item.SK,
  };
};

/*
 ******************************************** MENU ********************************************
 */

export const createMenuItemFrom = (
  menu: IMenuItem,
  priceList: IPriceList
): IMenu => {
  return {
    PK: `Menu`,
    SK: `Original`,
    items: menu,
    prices: priceList,
  };
};

export const createPriceListFrom = (menu: IMenuItem): IPriceList => {
  let priceList: IPriceList = {};
  menu.wontons.forEach((w) => {
    priceList[w.name.toLowerCase().replaceAll(' ', '')] = w.price;
  });
  menu.dip.forEach((d) => {
    priceList[`${d.name.toLowerCase().replaceAll(' ', '')}`] = d.price;
  });
  return priceList;
};

export type MenuItemBase = {
  name: string;
  desc: string;
  price: number;
};

export interface IMenu extends YumYumBase {
  items: IMenuItem;
  prices: IPriceList;
}

export interface IMenuItem {
  wontons: IWontonItem[];
  dip: IDipItem[];
}

export interface IPriceList {
  [key: string]: number;
}

export interface IWontonItem extends MenuItemBase {
  ingredients: string[];
  cookingTime: number;
}

export interface IDipItem extends MenuItemBase {}

export type PartialMenu = Omit<IMenu, 'PK' | 'SK'>;

/*
 ******************************************** ORDER ********************************************
 */

export enum OrderStatus {
  QUEUED = 'queued',
  ASSIGNED = 'assigned',
  READY = 'ready',
}

export const createOrderHistoryItemFrom = (
  order: IOrderItem,
  elapsedSeconds: number
): IOrderHistoryItem => {
  return {
    PK: `Order`,
    SK: `History#${order.customerId}#${order.orderId}`,
    orderId: order.orderId,
    customerId: order.customerId,
    selection: order.selection,
    createdAt: order.createdAt,
    totalSum: order.totalSum,
    assignedTo: order.assignedTo ?? 'UnKnown',
    elapsedTimeInSec: elapsedSeconds,
  };
};

export const createOrderItemFrom = (order: ISchemaCreateOrder): IOrderItem => {
  let customerId = order.customerId ?? nanoid();
  let baseOrder = baseItemProperties();
  return {
    PK: `Order`,
    SK: `InProgress#${customerId}#${baseOrder.id}`,
    orderId: baseOrder.id,
    customerId: customerId,
    status: OrderStatus.QUEUED,
    selection: order.selection,
    createdAt: baseOrder.createdAt,
    totalSum: order.totalSum,
    fcmToken: order.fcmToken,
  };
};

export interface ISelectionItem {
  name: string;
  count: number;
  totalPrice: number;
}

export interface IOrderItem extends YumYumBase {
  customerId: string;
  orderId: string;
  status: OrderStatus;
  selection: ISelectionItem[];
  totalSum: number;
  createdAt: string;
  assignedTo?: string;
  startTime?: string;
  endTime?: string;
  fcmToken: string
}

export interface IOrderHistoryItem extends YumYumBase {
  customerId: string;
  orderId: string;
  selection: ISelectionItem[];
  totalSum: number;
  createdAt: string;
  assignedTo: string;
  elapsedTimeInSec: number;
}

/*
 ******************************************** RECEIPT ********************************************
 */

export const createReceiptItemFrom = (order: IOrderItem): IReceiptItem => {
  return {
    PK: `Receipt`,
    SK: order.orderId,
    orderId: order.orderId,
    customerId: order.customerId,
    selection: order.selection,
    createdAt: order.createdAt,
    totalSum: order.totalSum,
  };
};

export const createReceiptResponseItemFrom = (
  order: IReceiptItem
): PartialReceipt => {
  return {
    orderId: order.orderId,
    customerId: order.customerId,
    selection: order.selection,
    createdAt: order.createdAt,
    totalSum: order.totalSum,
  };
};

export interface IReceiptItem extends YumYumBase {
  orderId: string;
  customerId: string;
  selection: ISelectionItem[];
  totalSum: number;
  createdAt: string;
}

export type PartialReceipt = Omit<IReceiptItem, 'PK' | 'SK'>;

/*
 ******************************************** ADMIN PERSONAL ********************************************
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

export type PartialAdminItem = Omit<IAdminItem, 'PK' | 'SK'>;

/*
 ******************************************** JWT TOKEN ********************************************
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
 ******************************************** SCHEMA ********************************************
 */

export interface ISchemaCreateOrder {
  customerId?: string;
  selection: ISelectionItem[];
  totalSum: number;
  fcmToken: string;
}

export interface ISchemaLoginAdmin {
  username: string;
  password: string;
}

export interface ISchemaUpdateOrder {
  customerId: string;
  orderId: string;
}

export interface PartialHttpResponse {
  statusCode: number;
  statusMessage: string;
}
