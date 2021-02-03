import {ENTER_ROOM} from "../types";

const initialState = {
    roomName: '',
    lastUpdate: null
}

const roomReducer =(state=initialState, action)=> {
    switch (action.type) {
        case ENTER_ROOM:
            return {
                ...state,
                roomName: action.payload.name,
                lastUpdate: action.payload.lastUpdate
            }
        default: // need this for default case
            return state
    }

}
export default roomReducer
