import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ShoppingCartItem {
  name: string;
  price: number;
  quantity: number;
  type: 'menuItem' | 'dipItem';
}

type OrderItem = {
  count: number;
  name: string;
  totalPrice: number;
};

interface Order {
  orderId: string;
  customerId: string;
  selection: OrderItem[];
  createdAt: Date;
  totalSum: number;
}
interface ShoppingCartState {
  shoppingCartItems: ShoppingCartItem[];
  orders: Order[];
  customerId: string | null;
}

const initialState: ShoppingCartState = {
  shoppingCartItems: [],
  orders: [],
  customerId: localStorage.getItem('customerId') || null,
};

const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addNewOrderToCustomerOrderHistory(state, action: PayloadAction<Order>) {
      const order = action.payload;
      state.orders.push(order);
    },
    addToShoppingCart(
      state,
      action: PayloadAction<{ name: string; price: number }>
    ) {
      const { name, price } = action.payload;
      const existingItemIndex = state.shoppingCartItems.findIndex(
        (item) => item.name === name
      );
      if (existingItemIndex !== -1) {
        // Item already exists, increase quantity
        state.shoppingCartItems[existingItemIndex].quantity++;
      } else {
        // Item doesn't exist, add a new item
        state.shoppingCartItems.push({
          name,
          price,
          quantity: 1,
          type: (action.payload as any).type,
        });
      }
    },
    decreaseQuantity(state, action: PayloadAction<string>) {
      const itemName = action.payload;
      const itemIndex = state.shoppingCartItems.findIndex(
        (item) => item.name === itemName
      );

      if (itemIndex !== -1) {
        if (state.shoppingCartItems[itemIndex].quantity > 1) {
          state.shoppingCartItems[itemIndex].quantity--;
        } else {
          // Remove the item if quantity becomes 0
          state.shoppingCartItems.splice(itemIndex, 1);
        }
      }
    },
    increaseQuantity(state, action: PayloadAction<string>) {
      const itemName = action.payload;
      const itemIndex = state.shoppingCartItems.findIndex(
        (item) => item.name === itemName
      );

      if (itemIndex !== -1) {
        state.shoppingCartItems[itemIndex].quantity++;
      }
    },
    emptyCart(state) {
      // Reset the shoppingCartItems array to an empty array
      state.shoppingCartItems = [];
    },
  },
});

export default shoppingCartSlice.reducer;
export const {
  addToShoppingCart,
  decreaseQuantity,
  increaseQuantity,
  emptyCart,
  addNewOrderToCustomerOrderHistory,
} = shoppingCartSlice.actions;
