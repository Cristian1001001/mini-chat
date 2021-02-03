import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from './reducers/rootReducer'
import { createLogger } from 'redux-logger'
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist' // imports from redux-persist
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const logger = createLogger({})
const persistConfig = {
    key : 'app',
    storage : storage
}

const persistedReducer = persistReducer(persistConfig,rootReducer );

const store = createStore(persistedReducer,compose(
    applyMiddleware(
        thunk,
        logger
    )
))

const persistor = persistStore(store);

export {store,persistor}
