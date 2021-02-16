import React, {useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux";
import {allRooms, enterRoom} from "../redux/actions/room";
import moment from "moment";
import './chatList.style.css'
import {getAllMessages} from "../redux/actions/messages";

export const  ChatList =() => {
    const dispatch = useDispatch()
    const {rooms, roomId} = useSelector(state => state.room)
    const {userId, name} = useSelector(state => state.auth)
    useEffect( ()=>{
        dispatch(allRooms())
    },[dispatch])
    const handleClick = room=>{
        let lastUpdate= moment()
        console.log('aici user',userId)
        dispatch(enterRoom(userId,room,lastUpdate))
    }
    return(
        <div className='main'>
            <ul className="main collection with-header">
                <li className="collection-header">
                    <div
                        style={{
                            marginLeft: '20px'
                        }}
                    >
                        <h6>{name}</h6>
                    </div>
                    <div className='list-header'>
                        <div>
                            <h4>Chats</h4>
                        </div>
                        <div className='header-button'>
                            <button className='btn-floating btn-medium waves-effect waves-light green'>
                                Add
                            </button>
                        </div>
                    </div>
                </li>
                {rooms.length ?  rooms.map(room =>
                    <div className='button-list-container' key={room._id.toString()}>
                    <button className='button-list'
                            key={room._id.toString()}
                            // id={room._id.toString()}
                            onClick={e =>handleClick(room.name)}
                    >
                    {room.name}
                    </button>
                    </div>

                )
                :
                    <h6>No chats</h6>
                }
            </ul>
        </div>
    )
}
