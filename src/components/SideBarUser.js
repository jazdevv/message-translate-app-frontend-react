
function SideBarUser({name,profileImage,lastMessage,lastMessageDate}){

    return <li >
        <div className="flex p-1 gap-2 hover:bg-gray-100">
            <div className="w-full md:w-1/4 flex items-center pb-1">
                <div className="p-0 md:p-2">
                    <img className="rounded-full" src={`https://messaging-app-images.s3.eu-west-3.amazonaws.com/${profileImage}`}/>    
                </div>
            </div>
            <div className="w-3/4 border-b border-gray-300 flex flex-col justify-center pb-1 hidden md:block ">
                <div className="flex justify-between ">
                    <div className="text-lg flex items-center font-bold">{name}</div>
                    <div className="text-sm flex items-center text-gray-600">{lastMessageDate}</div>
                </div>
                <div className="text-gray-500">
                    {lastMessage}
                </div>
            </div>
            
        </div>
    </li>
}

export default SideBarUser