import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {},
        isAuthenticated: false
    },
    reducers: {

    },

});

const { actions, reducer } = slice;

export default reducer;