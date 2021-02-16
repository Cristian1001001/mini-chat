import ApiService from "../../service/api";
import {ENTER_ROOM,GET_ALL_ROOMS} from "../types";

export function enterRoom(userId,room,lastUpdate) {
    return  async dispatch => {
        try {
            const response = await ApiService.post('room', {userId,room,lastUpdate})
            console.log(response)
            dispatch({
                type: ENTER_ROOM,
                payload: response.data,
            })

        }catch (e) {}
    }

}
export function allRooms(){
    return async dispatch =>{
        try {
            const response = await ApiService.get('room/yourRooms', {})

            dispatch({
                type: GET_ALL_ROOMS,
                payload: response
            })
        }catch (e) {

        }
    }
}
