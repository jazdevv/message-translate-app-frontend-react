import { useState,useEffect, useRef, useCallback,useMemo } from "react";
import { useChatRoomId } from "../hooks/useChatRoomId";
import { useLoadMessages } from "../hooks/useLoadMessages";
import ChatInput from "./ChatInput";
import RenderMessages from "./RenderMessages";
import LoadingSvg from "../svg/loading-svg";

function ConversationChat({socket}){
   

   //Chat roomid redux
   const {getChatRoomId: chatRoomid,setChatRoomid} = useChatRoomId();

   //Actual conversation messages && other user'
   const [messagesLoadedCount,setMessagesLoadedCount] = useState(0);
   const {conversation,fetchMoreMessages,maxMessages,loading,conversationDetails,infiniteLoading} = useLoadMessages(socket,messagesLoadedCount,setMessagesLoadedCount);
   
   //reset chat one time chatroom changes
   useMemo(()=>{
      setMessagesLoadedCount(0);
   },[chatRoomid])
    
   //Infinite Scroll
   const loader = useRef(null);
   const handleObserver = useCallback((entries)=>{
      const target = entries[0];
      if(target.isIntersecting){
         if(maxMessages===false || loading===true){
            if(messagesLoadedCount === 0){
               return
            }
            console.log("messages loaded count infinite",messagesLoadedCount)
            fetchMoreMessages(messagesLoadedCount)
         }
         
      }
   },[messagesLoadedCount,setMessagesLoadedCount])

    
   useEffect(()=>{
      const option = {
         root: null,
         rootMargin: "20px",
         threshold: 0
      }

      const observer = new IntersectionObserver(handleObserver,option);
      if (loader.current) observer.observe(loader.current)

      return ()=>{
         if(loader.current){
            observer.unobserve(loader.current)
         }
      }
   },[handleObserver])
   //  https://cdn.wallpapersafari.com/28/79/p75Yz0.jpg
   //https://i.pinimg.com/originals/8c/98/99/8c98994518b575bfd8c949e91d20548b.jpg
   //https://i.pinimg.com/originals/98/da/8f/98da8f9306de27424460d16e53938b72.jpg
    return <div className="flex-1  justify-between flex flex-col h-screen">
       <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200 p:2 sm:p-6">
          <div className="relative flex items-center space-x-4">
             <div className="relative">
                <span className="absolute text-green-500 right-0 bottom-0">
                   <svg width="20" height="20">
                      {/* <circle cx="8" cy="8" r="8" fill="currentColor"></circle> */}
                   </svg>
                </span>
             <img src={`https://messaging-app-images.s3.eu-west-3.amazonaws.com/${conversationDetails.profileImage}`} alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full object-cover"/>
             </div>
             <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center">
                   <span className="text-gray-700 mr-3">{conversationDetails ? conversationDetails.name : <LoadingSvg type={'cubes'}/> }</span>
                </div>
                <span className="text-lg text-gray-600">{conversationDetails ? conversationDetails.status : <LoadingSvg type={'cubes'}/> }</span>
             </div>
          </div>
          <div className="flex items-center space-x-2">
   
          </div>
       </div>
       <div id="messages"   className="h-4/5 p:2 sm:p-6 flex flex-col-reverse space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch gap-1 bg-[url('https://cdn.wallpapersafari.com/28/79/p75Yz0.jpg')]">
         {loading ? <LoadingSvg type={'cubes'}/>  : <RenderMessages messagesArray={conversation}/>}
         {infiniteLoading && <LoadingSvg type={'cubes'}/>}
         <div ref={loader}></div>
       </div>
       <ChatInput socket={socket} chatRoomid={chatRoomid}/>
    </div>
    
    
}

export default ConversationChat