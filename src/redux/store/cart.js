import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import CartApi from '../../api/CartApi'

export const fetchProducts = createAsyncThunk('cart/fetch', async (data, { rejectWithValue }) => {
    const response = await CartApi.getAll();
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }

    return response;
})

// lay cart tu db len sau khi login
export const fetchCart = createAsyncThunk('cart/fetchCart', async (data, { rejectWithValue }) => {
    const response = await CartApi.syncCartWithUser(data);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    let cart = response.chiMucGioHangList.map(({ soLuong, sanPham: { maSP, hinhAnh, ten, donGiaBan, moTa, qty }, }) => ({
        maSP, hinhAnh, ten, moTa, donGiaBan, qty: soLuong
    }))
    let numberCart = cart.reduce((accu, item) =>
        (accu += item.qty), 0
    )
    return { cart, numberCart };
})

export const saveLocalCart = createAsyncThunk('cart/saveLocalCart', async (data, { rejectWithValue }) => {
    const response = await CartApi.saveLocalCartToUser(data);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    let cart = response.chiMucGioHangList.map(({ soLuong, sanPham: { maSP, hinhAnh, ten, donGiaBan, moTa, qty }, }) => ({
        maSP, hinhAnh, ten, moTa, donGiaBan, qty: soLuong
    }))
    let numberCart = response.chiMucGioHangList.reduce((accu, item) =>
        (accu += item.soLuong), 0
    )
    return { cart, numberCart };
})

export const addToCart = createAsyncThunk('cart/addToCart', async (data, { rejectWithValue }) => {
    const response = await CartApi.addToCart(data);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    let cart = response.chiMucGioHangList.map(({ soLuong, sanPham: { maSP, hinhAnh, ten, donGiaBan, moTa, qty }, }) => ({
        maSP, hinhAnh, ten, moTa, donGiaBan, qty: soLuong
    }))
    let numberCart = response.chiMucGioHangList.reduce((accu, item) =>
        (accu += item.soLuong), 0
    )
    return { cart, numberCart };
})

export const changeQuantityToCart = createAsyncThunk('cart/changeQuantityToCart', async (data, { rejectWithValue }) => {
    const response = await CartApi.changeQuantityToCart(data);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    let cart = response.chiMucGioHangList.map(({ soLuong, sanPham: { maSP, hinhAnh, ten, donGiaBan, moTa, qty }, }) => ({
        maSP, hinhAnh, ten, moTa, donGiaBan, qty: soLuong
    }))
    let numberCart = response.chiMucGioHangList.reduce((accu, item) =>
        (accu += item.soLuong), 0
    )
    return { cart, numberCart };
})

export const removeCart = createAsyncThunk('cart/removeFromCart', async (data, { rejectWithValue }) => {
    const response = await CartApi.removeFromCart(data);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    let cart = response.chiMucGioHangList.map(({ soLuong, sanPham: { maSP, hinhAnh, ten, donGiaBan, moTa, qty }, }) => ({
        maSP, hinhAnh, ten, moTa, donGiaBan, qty: soLuong
    }))
    let numberCart = response.chiMucGioHangList.reduce((accu, item) =>
        (accu += item.soLuong), 0
    )
    return { cart, numberCart };
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
        },
        [fetchCart.fulfilled]: (state, action) => {
            state.cart = action.payload.cart;
            state.numberCart = action.payload.numberCart;
        },
        [addToCart.fulfilled]: (state, action) => {
            state.cart = action.payload.cart;
            state.numberCart = action.payload.numberCart;
        },
        [changeQuantityToCart.fulfilled]: (state, action) => {
            state.cart = action.payload.cart;
            state.numberCart = action.payload.numberCart;
        },
        [removeCart.fulfilled]: (state, action) => {
            state.cart = action.payload.cart;
            state.numberCart = action.payload.numberCart;
        },
        [saveLocalCart.fulfilled]: (state, action) => {
            state.cart = action.payload.cart;
            state.numberCart = action.payload.numberCart;
        }
    }
});

const { actions, reducer } = slice;
export const { addCart, removeFromCart, increaseQuantity, decreaseQuantity } = actions;
export default reducer;