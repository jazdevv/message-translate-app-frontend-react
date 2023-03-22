import { useRef, useState } from "react";

function ChatInput({socket,chatRoomid}){

    //Message input states
   const [message,setMessage] = useState("");
   const [image,setImage] = useState(null);

   //use ref to hidden file input
   const File = useRef();
   //Click redirect svg to hidden input
   const handleClick = ()=>{
    File.current.click();
    }

    //input message handle functions

    const handleChange = (event) =>{
      
        setMessage(event.target.value);
    }   

    const handleSubmit = (event) => {
         event.preventDefault();
        let data = {};
        if(message){
         data.message = message;
        }
        
        if(image){
         data.image = image;
        }
        
        data.roomid = chatRoomid;
        //return if there is not any field
        if(!data.image && !data.message){
         console.log("missing inputs")
         return
        }
        //send message
        socket.emit('roomid-messages-listener',data);
        //reset inputs
        setMessage("");
        setImage(null);
    }

    const handleImageSubmit = (event)=>{
        setImage(event.target.files[0]);
    }

    return <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0 p:2 sm:p-4">
    <div className="relative flex">
       {/* <span className="absolute inset-y-0 flex items-center">
          <button type="button" className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
             </svg>
          </button>
       </span> */}
       <span className="absolute inset-y-0 flex items-center">
       <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
             </svg>
          </button>
          </span>
          <form onSubmit={handleSubmit} className="w-full">
            <input value={message} onChange={handleChange} type="text" placeholder="Write your message!" className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"/>
          </form>
       <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
          
          <button type="button" className="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
            <input ref={File} onChange={handleImageSubmit}className="hidden" type="file" accept="image/*"/>
             <svg onClick={handleClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
             </svg>
          </button>
          <button onClick={handleSubmit} type="button" className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
             <span className="font-bold">Send</span>
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
             </svg>
          </button>
       </div>
    </div>
 </div>

}

export default ChatInput;