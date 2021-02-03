import React, {useState} from 'react'
import moment from "moment";
import {useSelector} from "react-redux";

export const Chat = ()=>{
    const {data} = useSelector(state=>state.auth)
    const [message, setMessage]= useState('')
    const changeHandler = event => {
        setMessage(event.target.name= event.target.value )
    }
    // const submitMessage = (e)=>{
    //     let nowTime=moment()
    //     dispatch(sentMessage(form.message,userId,roomId,nowTime))
    // }

    return(
        <>
            <div className="row">
                <h3>This is chat room</h3>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="Enter Message" type="text" name="message"  value={message}
                            onChange={changeHandler}
                            />
                            <button className="btn-btn-small waves-effect waves-light blue"

                            >
                                Sent
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
