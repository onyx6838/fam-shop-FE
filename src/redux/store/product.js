import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import SanPhamApi from '../../api/SanPhamApi'
import DacTrungApi from '../../api/DacTrungApi'
import ThuongHieuApi from '../../api/ThuongHieuApi'

import { map } from 'lodash'

/**
 * thunk
 */
export const fetchProductsFilter = createAsyncThunk('product/fetchFilter', async (data, { rejectWithValue }) => {
    console.log("filter");
    let { categories, page, size, category, selectedFilters, search, brand, typeOfGetProduct } = data;
    switch (typeOfGetProduct) {
        case 'SEARCH':  // k có brand từ ngoài vào
            category = 0;
            categories = []
            brand = 0
            break;
        case 'CATEGORY':
            category = categories.length > 0 ? 0 : category
            search = ''
            brand = 0
            break;
        case 'BRAND_SEARCH':    // từ trong filter
            category = 0;
            categories = []
            break;
        case 'BRAND_CATEGORY':
            category = categories.length > 0 ? 0 : category
            search = ''
            break;
        default:
            break;
    }
    const response = await SanPhamApi.filterByDacTrungAndLoaiSP(
        {
            listDacTrung: selectedFilters,
            loaiSP: category,
            categories: categories,
            search: search,
            brand: brand
        }, { page, size });
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

export const fetchProductFeatures = createAsyncThunk('feature/getFeatures', async (data, { rejectWithValue }) => {
    let { categories, category, search, typeOfGetProduct } = data;
    switch (typeOfGetProduct) {
        case 'SEARCH':  // k có brand từ ngoài vào
        case 'BRAND_SEARCH':
            category = 0;
            categories = []
            break;
        case 'CATEGORY':
        case 'BRAND_CATEGORY':
            category = categories.length > 0 ? 0 : category
            search = ''
            break;
        default:
            break;
    }
    const response = await
        DacTrungApi.getFeatureByLoaiSP(
            {
                loaiSP: category,
                categories: categories,
                search: search
            });
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { response, categories, category, search, typeOfGetProduct };
})

export const fetchProductBrands = createAsyncThunk('brand/getBrands', async (data, { rejectWithValue }) => {
    let { categories, category, search, typeOfGetProduct } = data;
    switch (typeOfGetProduct) {
        case 'SEARCH':  // k có brand từ ngoài vào
        case 'BRAND_SEARCH':
            category = 0;
            categories = []
            break;
        case 'CATEGORY':
        case 'BRAND_CATEGORY':
            category = categories.length > 0 ? 0 : category
            search = ''
            break;
        default:
            break;
    }
    const response = await
        ThuongHieuApi.getBrandByFilter(
            {
                loaiSP: category,
                categories: categories,
                search: search
            });
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { response, categories, category, search, typeOfGetProduct };
})

const slice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        totalElements: 0,
        totalPages: 0,
        page: 1,
        size: 2,
        // filter by category
        category: 0,
        categoryName: '',
        // filter by list category
        categories: [],
        // filter by feature when select in UI
        selectedFilters: [],
        // render filterBar from BE
        filters: {},
        // search bar
        search: '',
        // brand filter
        brand: 0,
        brands: [],
        typeOfGetProduct: '' // logic để 1 là search 2 chỉ theo thể loại, thêm brand vào 2 loại khi vào trong , 
        // k xảy ra đồng thời cả 2 (k lquan đến filter)
    },
    reducers: {
        changeSearch: (state, action) => {
            state.search = action.payload
        },
        changeCategory: (state, action) => {
            state.category = action.payload.maLoai
            state.categories = map(action.payload.loaiSPConList, 'maLoai')
        },
        changeCategoryName: (state, action) => {
            state.categoryName = action.payload
        },
        changeTypeOfGetProduct: (state, action) => {
            state.typeOfGetProduct = action.payload
        },
        changeSelectedFilters: (state, action) => {
            state.selectedFilters = action.payload
        },
        changeBrand: (state, action) => {
            state.brand = action.payload
        }
    },
    extraReducers: {
        [fetchProductsFilter.fulfilled]: (state, action) => {
            state.products = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        },
        [fetchProductFeatures.fulfilled]: (state, action) => {
            state.filters = action.payload.response;
        },
        [fetchProductBrands.fulfilled]: (state, action) => {
            state.brands = action.payload.response;
        }
    }
});

const { reducer, actions } = slice;
export const { changeSearch, changeCategory, changeCategoryName, changeTypeOfGetProduct, changeSelectedFilters, changeBrand } = actions;
export default reducer;