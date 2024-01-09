export enum SizeTypes {
  "REGULAR" = "regular",
  "SMALL" = "small",
  "MEDIUM" = "medium",
  "LARGE" = "large",
}

export enum StyleTypes {
  "DEFAULT" = "default",
  "DARK" = "dark",
  "LIGHT" = "light",
}

export type MenuItem = {
  id: string;
  title: string;
  desc: string;
  price: number;
  category: string;
  ingredients?: [];
};

export type Item = {
  product: string;
  quantity: number;
  total: number;
};

export type OrderType = {
  orderId: string;
  customerId: string;

  assignedTo: string;
  status: string;

  startTime: string;
  endTime: string;
  createdAt: string;

  selection: Item[];
};

export type ServerResponse = {
  status: number;
  message: string;
};
