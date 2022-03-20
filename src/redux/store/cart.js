import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import CartApi from '../../api/CartApi'

export const fetchProducts = createAsyncThunk('cart/fetch', async (data, { rejectWithValue }) => {
    const response = await CartApi.getAll();
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }

    return response;
})

const slice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        cart: [],
        numberCart: 0
    },
    reducers: {
        addCart: (state, action) => {
            const { maSP, hinhAnh, ten, donGiaBan, moTa, qty } = action.payload;
            const inCart = state.cart.find((item) => item.maSP === action.payload.maSP);
            if (inCart) {
                const qtyInx = state.cart.findIndex(
                    (item) => item.maSP === action.payload.maSP
                );
                state.cart[qtyInx].qty += qty ? qty : 1;
            } else {
                state.cart.push({ maSP, hinhAnh, ten, moTa, donGiaBan, qty: qty ? qty : 1 });
            }
            state.numberCart += qty ? qty : 1;
        },
        removeFromCart: (state, action) => {
            state.cart.splice(state.cart.findIndex((a) => a.maSP === action.payload.maSP), 1);
            state.numberCart -= action.payload.qty;
        },
        increaseQuantity: (state, action) => {
            const indexInCart = state.cart.indexOf(state.cart.find(item => item.maSP === action.payload.maSP))
            state.cart[indexInCart].qty += 1;
            state.numberCart += 1;
        },
        decreaseQuantity: (state, action) => {
            const indexInCart = state.cart.findIndex((item) => item.maSP === action.payload.maSP)
            state.cart[indexInCart].qty -= 1;
            state.numberCart -= 1;
            if (state.cart[indexInCart].qty === 0) {
                state.cart.splice(indexInCart, 1);
            }
        }
    },
    extraReducers: {
        [fetchProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
        }
    }
});

const { actions, reducer } = slice;
export const { addCart, removeFromCart, increaseQuantity, decreaseQuantity } = actions;
export default reducer;