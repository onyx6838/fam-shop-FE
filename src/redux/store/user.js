import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import UserApi from '../../api/UserApi'

export const fetchLogin = createAsyncThunk('user/login', async (data, { rejectWithValue }) => {
    const { username, password } = data;
    try {
        const response = await UserApi.login(username, password);
        return response;
    } catch (err) {
        if (!err.response) {
            throw err
        }
        console.log(err);
        return rejectWithValue(true)
    }
})

const slice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {},
        isAuth: false,
        isRememberMe: false,
        httpErr: false
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload
        }
    },
    extraReducers: {
        [fetchLogin.fulfilled]: (state, action) => {
            state.userInfo = action.payload;
        },
        [fetchLogin.rejected]: (state, action) => {
            state.httpErr = action.payload;
        }
    }
});

const { actions, reducer } = slice;
export const { setAuth } = actions;
export default reducer;