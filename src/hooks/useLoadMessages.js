import axios from "axios";
import { useState, useCallback, useEffect, useMemo } from "react";
import {useServerURL} from './useServerURL'
import { useChatRoomId } from "./useChatRoomId";

function useLoadMessages(socket,messagesLoadedCount,setMessagesLoadedCount){
   const [loading,setLoading] = useState(false);
   const [infiniteLoading,setInfiniteLoading] = useState(false)
   const [conversationDetails,setConversationDetailsState] = useState({loading:true});//Group name and image || Username and image
   const [conversation,setConversation] = useState([]);
   //Chat roomid redux
   const {getChatRoomId: chatRoomid,setChatRoomid} = useChatRoomId();
   const [maxMessages,setMaxMessages] = useState(false);
   const serverUrl = useServerURL();
   
   const setConversationDetails = ({name,profileImage,status,id}) => {

      setConversationDetailsState({name,profileImage,status,id,loading:false})

   }

   const increaseMessageCount = useCallback(async(messagesLoadedCount)=>{
      if(maxMessages || loading){
         console.log('returning')
         return
      }
   
      //SET LOADING MORE MESSAGES TRUE
      setInfiniteLoading(true);
      //LOAD MESSAGES FROM BACKEND SERVER
      console.log('messages loaded count',messagesLoadedCount)
      const loadedMessages = await axios.get(`${serverUrl}/messages/${chatRoomid}/${messagesLoadedCount}/false`,{withCredentials:true})
      //ADD MESSAGES TO THE STATE
      setConversation([...conversation,...loadedMessages.data.messages]);
      //DETECT IF ARE MORE MESSAGES TO FETCH
      if(loadedMessages.data.messages.length < 15){
        setMaxMessages(true) 
      }
      setMessagesLoadedCount(messagesLoadedCount+loadedMessages.data.messages.length)
      //SET LOADING MORE MESSAGE FALSE
      setInfiniteLoading(false);
   
   },[setConversation,conversation])

   const handleReciveMessage = useCallback((data)=>{

      setConversation([data,...conversation]);

   },[setConversation,conversation])

   useEffect(()=>{
      socket.on("roomid-messages-listener",(data)=>{
         handleReciveMessage(data)
      }) 

      return ()=>socket.offAny("roomid-messages-listener")
   },[handleReciveMessage])
   
   //FIRST RENDER
   useEffect(()=>{
      setLoading(true);
      
      //get messages
       const getMessages = async ()=>{
         const messages = await axios.get(`${serverUrl}/messages/${chatRoomid}/${messagesLoadedCount}/true`,{withCredentials:true});
         //pass messages to the state
         setConversation(messages.data.messages);
         setMessagesLoadedCount(messages.data.messages.length)
         setConversationDetails(messages.data.conversationDetails);
         setLoading(false);

         //reset states
         setMaxMessages(false);
         
       } 

       getMessages();
   
      
   },[chatRoomid])

   return{conversation,fetchMoreMessages : increaseMessageCount,maxMessages,loading,conversationDetails,infiniteLoading}

}

export {useLoadMessages}