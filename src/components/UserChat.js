import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from 'socket.io-client';

const socket = io("ws://127.0.0.1:3001",{
    withCredentials: true,
  });


function Chat(){
    let {id} = useParams()
    useEffect(()=>{
        console.log("joining room")
        socket.emit("tempWs",{otheruser:id})
        socket.emit("joinroom",{otheruser:id})
    },[id])
    

    return <div>Chat {id}</div>


}

export default Chat;