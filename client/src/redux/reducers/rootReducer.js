import {combineReducers} from 'redux'
import login_reducer from "./auth";
import roomReducer from "./room"


export const rootReducer = combineReducers({
    auth: login_reducer,
    room: roomReducer
})
