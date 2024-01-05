import { Item } from "@zocom/types"

export const ADD_TO_CART = 'ADD_TO_CART';

export interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: Item;
}

export const addToCart = (item: Item): AddToCartAction => ({
  type: ADD_TO_CART,
  payload: item,
});