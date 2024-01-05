import { ADD_TO_CART, AddToCartAction } from '@zocom/actions';
import { ShoppingCartState } from '@zocom/types';

const initialState: ShoppingCartState = {
  cart: [],
};

const cartReducer = (state: ShoppingCartState = initialState, action: AddToCartAction): ShoppingCartState => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    default:
      return state;
  }
};

export default cartReducer;