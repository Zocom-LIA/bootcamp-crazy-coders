import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ShoppingCartItem {
    name: string;
    price: number;
    quantity: number; 
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
        addToShoppingCart(state, action: PayloadAction<{ name: string; price: number; }>) {
            state.shoppingCartItems.push({
                quantity: 1,
                ...action.payload
            });
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
        }
    }
}); 

export default shoppingCartSlice.reducer;
export const { addToShoppingCart, decreaseQuantity, increaseQuantity } = shoppingCartSlice.actions;
