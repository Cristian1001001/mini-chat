import {GET_ALL_MESSAGES, RESET_MESSAGES, SET_IS_LOADING} from "../types";
import ApiService from "../../service/api";

export function getAllMessages(roomId, page) {
    return async dispatch => {
        const scroll = {
            roomId,
            page
        }
        try {
            dispatch({
                type: SET_IS_LOADING,
                payload: true
            })
            const response = await ApiService.get(`messages/allMessages?scroll=${JSON.stringify(scroll)}`, {})
            dispatch({
                type: GET_ALL_MESSAGES,
                payload: response,
            })

        } catch (e) {
            console.log('get all messages error', e)
        }
        finally {
            dispatch(
                {
                    type: SET_IS_LOADING,
                    payload: false
                }
            )
        }
    }
}

export function resetConvers() {
    return async dispatch => {
        dispatch({
            type: RESET_MESSAGES,
            payload: undefined,
        })
    }
}
