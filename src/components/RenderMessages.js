import MessageLoggUser from "./MessageLoggedUser"
import React from "react";
import { useLoggUser } from "../hooks/useLoggUser";
import MessageOtherUser from "./MessageOtherUser";

function RenderMessages({messagesArray}){
    const [loggUser] = useLoggUser();
    
    const renderedMessages = messagesArray.map((messageData)=>{
        let message;
        if(loggUser.id===messageData.UserSender){
            message =  <MessageLoggUser  message={messageData}/>
        }else{
            message = <MessageOtherUser message={messageData}/>
        }
        return <React.Fragment key={messageData.id} >{message}</React.Fragment> 
    });

    return renderedMessages
}

export default RenderMessages