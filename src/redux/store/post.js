import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import BaiVietApi from '../../api/BaiVietApi'

/**
 * thunk
 */
export const fetchPosts = createAsyncThunk('post/fetchPosts', async (data, { rejectWithValue }) => {
    let { page, size } = data;
    const response = await BaiVietApi.getAll(page, size);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

export const fetchPostsByCate = createAsyncThunk('post/fetchPostsByCate', async (data, { rejectWithValue }) => {
    let { page, size, cate } = data;
    const response = await BaiVietApi.getAllByCate(page, size, cate);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

const slice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        totalElements: 0,
        totalPages: 0,
        page: 1,
        size: 2
    },
    extraReducers: {
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        },
        [fetchPostsByCate.fulfilled]: (state, action) => {
            state.posts = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        }
    }
});

const { reducer } = slice;

export default reducer;