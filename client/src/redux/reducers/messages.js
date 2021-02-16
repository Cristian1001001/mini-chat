import {GET_ALL_MESSAGES,RESET_MESSAGES,SET_IS_LOADING} from "../types";

const initialState ={
    // roomMessages: [],
    totalPages: null,
    currentPage: 0,
    totalMessages: [],
    isLoading: false
}

const messagesReducer = (state=initialState, action) =>{
    switch (action.type) {
        case GET_ALL_MESSAGES:
            return {
                ...state,
                // roomMessages: action.payload.messages,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.currentPage,
                totalMessages: [...state.totalMessages, ...action.payload.messages]
            }
        case RESET_MESSAGES:
            return {
                ...state,
                totalPages: null,
                currentPage: 0,
                totalMessages: []
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        default: // need this for default case
            return state
    }

}
export default messagesReducer
