import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import SanPhamApi from '../../api/SanPhamApi'
import DacTrungApi from '../../api/DacTrungApi'

import { map } from 'lodash'

/**
 * thunk
 */
export const fetchProductsFilter = createAsyncThunk('product/fetchFilter', async (data, { rejectWithValue }) => {
    let { categories, page, size, category, selectedFilters, search } = data;
    const response = await SanPhamApi.filterByDacTrungAndLoaiSP(
        {
            listDacTrung: selectedFilters,
            loaiSP: categories.length > 0 ? 0 : category,
            categories: categories,
            search: search
        }, { page, size });
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page, category, categories, selectedFilters, search };
})

export const fetchProductFeatures = createAsyncThunk('feature/getFeatures', async (data, { rejectWithValue }) => {
    const { categories, category, listDacTrung, search } = data;
    const response = await
        DacTrungApi.getFeatureByLoaiSP(
            {
                listDacTrung: listDacTrung,
                loaiSP: category,
                categories: categories,
                search: search
            });
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { response, categories, category, search };
})

const slice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        totalElements: 0,
        totalPages: 0,
        page: 1,
        size: 3,
        // filter by category
        category: 0,
        // filter by list category
        categories: [],
        // filter by feature when select in UI
        selectedFilters: [],
        // render filterBar from BE
        filters: {},
        // search bar
        search: ''
    },
    reducers: {
        changeSearch: (state, action) => {
            state.search = action.payload
        },
        changeCategory: (state, action) => {
            state.category = action.payload.maLoai
            state.categories = map(action.payload.loaiSPConList, 'maLoai')
        }
    },
    extraReducers: {
        [fetchProductsFilter.fulfilled]: (state, action) => {
            state.products = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
            state.category = action.payload.category;
            state.categories = action.payload.categories;
            state.selectedFilters = action.payload.selectedFilters;
            state.search = action.payload.search;
        },
        [fetchProductFeatures.fulfilled]: (state, action) => {
            state.filters = action.payload.response;
            state.categories = action.payload.categories;
            state.category = action.payload.category;
            state.search = action.payload.search;
        }
    }
});

const { reducer, actions } = slice;
export const { changeSearch, changeCategory } = actions;
export default reducer;