import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import CartApi from '../../api/CartApi'

export const getProducts = createAsyncThunk('product/get', async (data, { rejectWithValue }) => {

    const response = await CartApi.getAll();
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }

    return response;
})

const slice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        page: 1,
        size: 3,
        // filter by category
        category: 0,
        // filter by feature
        selectedFilters: []
    },
    reducers: {
    },
    extraReducers: {
        [getProducts.fulfilled]: (state, action) => {
            state.products = action.payload;
        }
    }
});

const { actions, reducer } = slice;
export const { addCart } = actions;
export default reducer;