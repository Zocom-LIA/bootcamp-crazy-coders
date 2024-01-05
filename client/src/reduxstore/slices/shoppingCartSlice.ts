import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShoppingCartState {
    shoppingCartItems: object[];
}

const initialState: ShoppingCartState = {
    shoppingCartItems: []
}

const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers: {
        addToShoppingCart(state, action: PayloadAction<object> ) {
            state.shoppingCartItems.push(action.payload)
        },  
    }
}); 

export default shoppingCartSlice.reducer;
export const { addToShoppingCart } = shoppingCartSlice.actions;
