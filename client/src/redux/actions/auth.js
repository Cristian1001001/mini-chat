import ApiService from "../../service/api"
import {LOGIN_REGISTER, LOGIN_SUCCESS, LOG_OUT} from "../types";


export function register(email, password, name) {
    return  async dispatch => {
        const data = {
            email: email.trim(),
            password: password.trim(),
            name: name.trim(),
        }
        try {
            const response = await ApiService.post('auth/register', {...data})
            dispatch({
                type: LOGIN_REGISTER,
                payload: response.data,
            })

        }catch (e) {}
    }

}
export function try_login(email, password) {
    return async dispatch => {
        const data = {
            email: email.trim(),
            password: password.trim(),
        }
        try {
            const response = await ApiService.post('auth/login', {...data})
            dispatch({type :LOGIN_SUCCESS,
                payload: response.data})
        }catch (e){}
    }
}
export function log_out() {
    return dispatch => {
        dispatch({
            type: LOG_OUT,
            payload: undefined
        })
    }
}
