import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import UserApi from '../../api/UserApi'
import storage from '../../storage/storage';

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
        userInfo: storage.getUserInfo(),
        token: storage.getToken(),
        refreshToken: storage.getRefreshToken(),
        isRememberMe: storage.isRememberMe()
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setRememberMe: (state, action) => {
            state.isRememberMe = action.payload
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload
        }
    },
    extraReducers: {
        [fetchLogin.fulfilled]: (state, action) => {
            state.userInfo = action.payload;
        }
    }
});

const { actions, reducer } = slice;
export const { setToken, setRememberMe, setUserInfo, setRefreshToken } = actions;
export default reducer;