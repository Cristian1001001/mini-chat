import {combineReducers} from 'redux'
import login_reducer from "./auth";
import roomReducer from "./room"
import messagesReducer from "./messages"


export const rootReducer = combineReducers({
    auth: login_reducer,
    room: roomReducer,
    message: messagesReducer,
})
