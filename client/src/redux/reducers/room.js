import {ENTER_ROOM,GET_ALL_ROOMS} from "../types";

const initialState = {
    roomName: '',
    lastUpdate: null,
    roomId: '',
    rooms: []
}

const roomReducer =(state=initialState, action)=> {
    switch (action.type) {
        case ENTER_ROOM:
            return {
                ...state,
                roomName: action.payload.name,
                lastUpdate: action.payload.lastUpdate,
                roomId: action.payload._id
            }
        case GET_ALL_ROOMS:
            return {
                ...state,
                rooms: action.payload
            }
        default: // need this for default case
            return state
    }

}
export default roomReducer
