import SideBarUser from "./SideBarUser"
import { Link } from "react-router-dom"
import SideBarHeader from "./SideBarHeader";

function SideBarUsers({rooms}){
    
    //chat room by userid ?u=id
    //chat room by roomid ?r=id
    const renderedRooms =  rooms.map((room)=>{
        return <Link to={`/chat/?r=${room.roomid}`} key={room.roomid}>
            <SideBarUser name={room.otheruser.username} profileImage={room.otheruser.profileImage} lastMessage="message" lastMessageDate="03/01/2100"/>
        </Link> 
    })
        
    return ( 
        <>
        <aside className="w-16 xs:w-16 md:w-64 xl:w-96 h-screen border-r border-gray-300 " >
            <div className="h-full  md:pb-4  bg-gray-50 dark:bg-gray-800 flex flex-col gap-2 bg-blue-700">
                <SideBarHeader/>
                
                <ul className="space-y-2 overflow-y-auto">
                    {renderedRooms}
                </ul>
            </div>
        </aside>

        </>
    )
}

export default SideBarUsers