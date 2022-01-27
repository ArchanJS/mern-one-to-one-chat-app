import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import socket from '../socket';

const Chat = () => {
    const [message,setMessage]=useState("");
    const {state}=useLocation();
    const {userId,roomId}=state;
    const [messages,setMessages]=useState([]);
    
    useEffect(() => {
        socket.emit('joined', {userId,roomId});
    })
    useEffect(()=>{
        socket.on("sendallmessages",({allMessages})=>{
            setMessages(allMessages);
            console.log(allMessages);
        })
    })

    const send=(e)=>{
        e.preventDefault();
        socket.emit("sendmessage",{userId,roomId,message});
        setMessage("");
    }
    return <div>
        <div className="chat-div">
        <div className="messages">
            {
                messages.length>0
                ?
                messages.map((mes,ind)=>{
                    return  <div className={mes.senderId===userId?"sent-message":"received-message"} key={ind} >{mes.senderId===userId?"You":"Other"}: {mes.message}</div>
            
                })
                :
                null
            }
        </div>
        <form className="chat-input-div">
            <input type="text" className="message-inp" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
            <button type="submit" className="message-btn" onClick={send}>Send</button>
        </form>
    </div>
    </div>;
};

export default Chat;
