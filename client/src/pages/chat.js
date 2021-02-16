import React, {useState, useEffect, useRef} from 'react'
import moment from "moment";
import {useSelector, useDispatch} from "react-redux";
import socketIOClient from "socket.io-client";
import InfiniteScroll from 'react-infinite-scroll-component';
import {getAllMessages, resetConvers} from "../redux/actions/messages"
import './chat.style.css'
import {Loading} from "../components/loader";

const ENDPOINT = "ws://127.0.0.1:5000";
let socket;

export const Chat = () => {
    const {userId, name} = useSelector(state => state.auth)
    const {roomId} = useSelector(state => state.room)
    const {totalPages, currentPage, totalMessages, isLoading} = useSelector(state => state.message)
    const [message, setMessage] = useState('')
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])
    const ref = useRef()
    const dispatch = useDispatch()

    const changeHandler = event => {
        setMessage(event.target.name = event.target.value)
    }
    useEffect(() => {
        ref.current = roomId
        dispatch(resetConvers())
        setPage(1)
    }, [roomId])
    useEffect(() => {
        socket = socketIOClient(ENDPOINT, {query: {roomId}});
        socket.on('sentMessage', m => {
            console.log(m)
            setData(prev => prev.concat({...m}))
        })
        return () => {
            console.log('disconnect')
            setData([])
            socket.disconnect()
        }
    }, [roomId])
    useEffect(() => {
        (async () => {
            if (ref.current !== roomId) {
                await setPage(1)
                await dispatch(resetConvers())
                await dispatch(getAllMessages(roomId, page))
                ref.current = roomId
            } else {
                dispatch(getAllMessages(roomId, page))
            }
        })()
    }, [roomId, page])

    const onClick = () => {
        let nowTime = moment()
        const payload = {
            message: message,
            userId,
            roomId,
            nowTime,
            name
        }
        console.log('numele la onclick', name)
        setData(prev => prev.concat({...payload}))
        socket.emit('sendMessage', {...payload})
        setMessage('')
    }

    const handleEnter = e => {
        if (e.key === 'Enter') {
            onClick()
        }
    }

    const handleScroll = () => {
        if (!isLoading)
            setPage(page + 1)
    }

    return (
        <div className='window'>
            {/*scroll start*/}
            <div
                id="scrollableDiv"
                style={{
                    height: 380,
                    overflow: 'auto',
                    display: 'flex',
                    flexDirection: 'column-reverse',
                }}
            >
                {/*Put the scroll bar always on the bottom*/}
                <InfiniteScroll
                    dataLength={totalMessages.length}
                    next={handleScroll}
                    style={{
                        display: 'flex',
                        flexDirection: 'column-reverse'
                    }} //To put endMessage and loader to the top.
                    inverse={true} //
                    endMessage={<h5>Gata mai</h5>}
                    hasMore={!(totalPages === currentPage)}
                    loader={<Loading/>}
                    scrollableTarget="scrollableDiv"
                >
                    {/*<div className='message-order'>*/}
                    <div className='instant-message'>
                        {
                            data.map((instantMessage, index) => (
                                <div key={index}>
                                    <div>{instantMessage.name}</div>
                                    <div key={index.toString()} className='message-bubble'>
                                        <div className='bubble'>{instantMessage.message}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {totalMessages.map((mesaj, index) => (
                        <div key={index}>
                            <div>{mesaj.name}</div>
                            <div key={index.toString()} className='message-bubble'>
                                <div className='bubble'>{mesaj.message}</div>
                            </div>
                        </div>
                    ))}
                    {/*</div>*/}
                </InfiniteScroll>
            </div>
            {/*scroll end*/}
            <div className='message-input'>
                <input placeholder="Enter Message" type="text" name="message" value={message}
                       onChange={changeHandler}
                       onKeyPress={handleEnter}
                />
                <button className="waves-effect waves-light btn"
                        onClick={onClick}
                >
                    Send
                </button>
            </div>
        </div>
    )
}
