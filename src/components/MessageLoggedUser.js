function MessageLoggUser({message}){
            
            return <div className="chat-message">
                        <div className="flex items-end justify-end">
                           <div className="flex flex-col space-y-2 text-md max-w-xs mx-2 order-1 items-end">
                              <div><span className="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white ">{message.text}</span></div>
                           </div>
                        </div>
                     </div>
         }

         export default MessageLoggUser