import React from 'react'
import {ChatList} from "../components/chatList";
import {useSelector} from "react-redux";
import {Chat} from "./chat";
import './appWindow.style.css'

export const AppWindow=()=>{
    const {roomName}= useSelector(state=> state.room)
    return(
        <div className='main-window'>
            <div className='chat-list'>
                <ChatList/>
            </div>
            {!!roomName?
                <div className='chat-window'>
                    <Chat/>
                </div>
                :
                <p>Choose or create a room</p>
            }
        </div>
    )
}
