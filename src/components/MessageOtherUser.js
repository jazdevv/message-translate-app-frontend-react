function MessageOtherUser({message}){
    let showmessage = <></>;
    let showimage = <></>;
    if (message.type.indexOf("text") > -1) {
        showmessage = message.text
    }
    if (message.type.indexOf("image") > -1) {
        showimage = <img src={`https://messaging-app-images.s3.eu-west-3.amazonaws.com/${message.imageUrl}`}></img>
    }
    return  <div className="chat-message">
                <div className="flex items-end">
                    <div className="flex flex-col space-y-2 text-md max-w-xs mx-2 order-2 items-start">
                            <div>
                                <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-500 text-white ">
                                    {showimage}
                                    {showmessage}
                                </span>
                            </div>     
                    </div>               
                </div>
            </div>
 }

 export default MessageOtherUser