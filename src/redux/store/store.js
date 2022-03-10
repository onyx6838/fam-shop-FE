import { configureStore } from '@reduxjs/toolkit'

import { combineReducers } from 'redux'

import cart from './cart'
import product from './product'

const reducer = combineReducers({
    cart,
    product
})

const store = configureStore({ reducer })

export default store;