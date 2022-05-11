import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import cart from './cart'
import product from './product'
import user from './user'
import { combineReducers } from 'redux'
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
//import storageSession from 'redux-persist/lib/storage/session'

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['cart', 'product']
}

//const authPersistConfig = { key: 'user', storage: storageSession };

const reducer = combineReducers({
    cart,
    product,
    user
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
            immutableCheck: { warnAfter: 128 }
        }),
})

export default store;