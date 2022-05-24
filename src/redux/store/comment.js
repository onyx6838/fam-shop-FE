import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DanhGiaApi from '../../api/DanhGiaApi'

/**
 * thunk
 */
export const fetchParentCommentsByProduct = createAsyncThunk('comment/fetchParentCommentsByProduct', async (data, { rejectWithValue }) => {
    let { page, size, maSP } = data;
    const response = await DanhGiaApi.getAllParentDanhGia(page, size, maSP);
    if (response.status < 200 || response.status >= 300) {
        return rejectWithValue(response);
    }
    return { ...response, page };
})

const slice = createSlice({
    name: 'comment',
    initialState: {
        comments: [],
        totalElements: 0,
        totalPages: 0,
        page: 1,
        size: 2,
        childComments: [],
        selectedComment: 0
    },
    extraReducers: {
        [fetchParentCommentsByProduct.fulfilled]: (state, action) => {
            state.comments = action.payload.content;
            state.totalElements = action.payload.totalElements;
            state.totalPages = action.payload.totalPages;
            state.page = action.payload.page;
        }
    }
});

const { reducer } = slice;

export default reducer;