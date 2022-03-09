import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import SanPhamApi from '../../api/SanPhamApi'

/**
 * thunk
 */
export const fetchProductsFilter = createAsyncThunk('product/fetchFilter', async (data, { rejectWithValue }) => {
    const { page, size } = data;
    const response = await SanPhamApi.getAll({ page, size });
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return response;
})

const slice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        totalElements: 0,
        totalPages: 0,
        page: 1,
        size: 6,
        // filter by category
        category: 0,
        // filter by feature
        selectedFilters: []
    },
    reducers: {
    },
    extraReducers: {
        [fetchProductsFilter.fulfilled]: (state, action) => {
            state.products = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        }
    }
});

const { actions, reducer } = slice;
export const { addCart } = actions;
export default reducer;