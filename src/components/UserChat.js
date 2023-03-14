import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useChatRoomId } from "../hooks/useChatRoomId";
import io from 'socket.io-client';


const socket = io("ws://127.0.0.1:3001",{
    withCredentials: true,
});


function Chat(){
    //Chat roomid redux
    const {getChatRoomId: chatRoomid,setChatRoomid} = useChatRoomId();
    console.log("chatroom",chatRoomid)
    //Actual conversation messages && other user
    const [conversation,setConversation] = useState({
        otheruser: undefined,
        messages: undefined,
        loading: true
    })
    //Allowed user roomid
    const [Allowed,setAllowed] = useState(true)

    //Get URL params
    let [searchParams] = useSearchParams()

    //Works as a piece state
    const userid = searchParams.get('u')
    const roomid = searchParams.get('r')

    //Render conversation every time is a different room id
    const getMessages = useEffect(()=>{
        //Return if not allowed user or chatRoomId not exists
        if(Allowed===false||!chatRoomid){
            return
        }
        //Get messages & other user
        

    },[chatRoomid]);

    //join room every time url changes
    useEffect(()=>{
        //join the room
        socket.emit("joinroom",{otheruser:parseInt(userid),roomid:parseInt(roomid)})

    },[userid,roomid]);
    
    // listen for event that makes you get the validated roomcode from server
    useEffect(()=>{
        socket.on("resjoinroom",(data)=>{
            setAllowed(data.valid);
            setChatRoomid(data.roomid);
            
        })   
        socket.on("errjoinroom",(data)=>{
            if(data.valid===false){
               setAllowed(false);
            }
        }) 
    },[])

    if(Allowed===false){
        return <div>You Shouldnt Be here</div>
    }else if(Allowed===true){
        if(chatRoomid){
            return <div>{chatRoomid}</div>
        }else if(!chatRoomid){
            return <div>Please choose a room</div>
        }    
    }
    


}

export default Chat;