function MessageOtherUser({message}){
    
    return  <div className="chat-message">
                <div className="flex items-end">
                    <div className="flex flex-col space-y-2 text-md max-w-xs mx-2 order-2 items-start">
                        <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">{message.text}</span></div>
                    </div>
                </div>
            </div>
 }

 export default MessageOtherUser