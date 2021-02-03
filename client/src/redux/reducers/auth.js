import {LOGIN_REGISTER, LOGIN_SUCCESS, LOG_OUT} from "../types";

const initialState = {
    // data: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    isLogged: false,
    msg : "",
    userId : null,
    token: null,
    email : '',
}

const login_reducer =(state=initialState, action)=> {
    switch (action.type) {
        case LOGIN_REGISTER :
            return {
                ...state,
                // email: action.payload.email,
                token: action.payload.token,
                name: action.payload.userName,
                userIdd: action.payload.userId,
                isLoading: false,
                isError: false,
                isSuccess: true,
                isLogged: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: true,
                isLogged: true,
                msg: '',
                // data: action.payload,
                userId: action.payload.userId,
                token: action.payload.token,
                email: action.payload.email,
                name: action.payload.userName
            }
        case LOG_OUT:
            return {
                ...state,
                isLoading: false,
                isLogged: false,
                token: undefined,
                name: undefined,
                data: undefined
            }
        default: // need this for default case
            return state
    }
}



export default login_reducer
