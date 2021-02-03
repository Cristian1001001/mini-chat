import ApiService from "../../service/api";
import {ENTER_ROOM} from "../types";

export function enterRoom(userId,room,lastUpdate) {
    return  async dispatch => {
        try {

            const response = await ApiService.post('room', {userId,room,lastUpdate})
            dispatch({
                type: ENTER_ROOM,
                payload: response.data.possibleRoom,
            })

        }catch (e) {}
    }

}
