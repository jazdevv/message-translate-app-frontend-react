import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useChatRoomId } from "../hooks/useChatRoomId";
import io from 'socket.io-client';
import ConversationChat from "./Chat";


const socket = io("/",{
    withCredentials: true,
    path:'/apinodews'
});


function Chat(){
    //Chat roomid redux
    const {getChatRoomId: chatRoomid,setChatRoomid} = useChatRoomId();
    console.log("chatroom",chatRoomid)
    
    //Allowed user roomid
    const [Allowed,setAllowed] = useState(true);

    //Get URL params
    let [searchParams] = useSearchParams();

    //Works as a piece state
    const userid = searchParams.get('u');
    const roomid = searchParams.get('r');

    

    //join room every time url changes
    useEffect(()=>{
        //join the room
        socket.emit("joinroom",{otheruser:parseInt(userid),roomid:parseInt(roomid)})
        setChatRoomid(roomid);

    },[userid,roomid]);
    
    // listen for event that makes you get the validated roomcode from server
    useEffect(()=>{
        
        //SUCCES
        socket.on("resjoinroom",(data)=>{
            setAllowed(data.valid);
            // setChatRoomid(data.roomid);
            
        })   
        //FAIL
        socket.on("errjoinroom",(data)=>{
            if(data.valid===false){
               setAllowed(false);
            }
        }) 
    },[userid,roomid])

    if(Allowed===false){
        return <div>You Shouldnt Be here</div>
    }else if(Allowed===true){
        if(chatRoomid){
            return <ConversationChat socket={socket}/>
        }else if(!chatRoomid){
            return <div>Please choose a room</div>
        }    
    }
    


}

export default Chat;