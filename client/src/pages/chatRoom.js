import React, {useState} from 'react'
import moment from "moment";
import {useDispatch, useSelector} from "react-redux";
import {enterRoom} from "../redux/actions/room";
import {Redirect} from "react-router-dom";

export const ChatRoom = () => {
    const dispatch = useDispatch()
    const {userId} = useSelector(state=>state.auth)
    const {roomName}= useSelector(state=> state.room)
    const [room, setRoom]= useState('')
    const changeHandler = event => {
        setRoom(event.target.name= event.target.value )
    }
    const submitRoom = ()=>{
        let lastUpdate=moment()
        dispatch(enterRoom(userId,room,lastUpdate))
    }
    return(
        <>
        <div className="row">
        <div className="input-field col s6">
            <input value={room}
                   type="text"
                   name='room'
                onChange={changeHandler}
            />
                <label className="active">Write Room</label>
                <button
                    onClick={submitRoom}
                >
                    Enter
                </button>
            {
                !!roomName ?
                    <Redirect to='/chat'/>
                        :
                    null
            }
        </div>
        </div>
        </>
    )
}
