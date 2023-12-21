export enum SizeTypes {
  'REGULAR' = 'regular',
  'SMALL' = 'small',
  'MEDIUM' = 'medium',
  'LARGE' = 'large',
}

export enum StyleTypes {
  'DEFAULT' = 'default',
  'DARK' = 'dark',
  'LIGHT' = 'light',
}

export type MenuItem = {
  id: string, 
  title: string,
  desc: string,
  price: number,
  category: string
  ingredients?: [],
} 

export type Item = {
  product: string;
  quantity: number;
  total: number;
};
