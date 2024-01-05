import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ShoppingCartItem {
    name: string;
    price: number;
    quantity: number; 
    type: 'menuItem' | 'dipItem';
}
interface ShoppingCartState {
    shoppingCartItems: ShoppingCartItem[];
}

const initialState: ShoppingCartState = {
    shoppingCartItems: []
}

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        addToShoppingCart(state, action: PayloadAction<{ name: string; price: number }>) {
            const { name, price } = action.payload;
            const existingItemIndex = state.shoppingCartItems.findIndex(item => item.name === name);
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
            const itemIndex = state.shoppingCartItems.findIndex(item => item.name === itemName);

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
            const itemIndex = state.shoppingCartItems.findIndex(item => item.name === itemName);
      
            if (itemIndex !== -1) {
                state.shoppingCartItems[itemIndex].quantity++;
            }
        },
        emptyCart(state) {
            // Reset the shoppingCartItems array to an empty array
            state.shoppingCartItems = [];
          },

    }
}); 

export default shoppingCartSlice.reducer;
export const { addToShoppingCart, decreaseQuantity, increaseQuantity, emptyCart } = shoppingCartSlice.actions;
