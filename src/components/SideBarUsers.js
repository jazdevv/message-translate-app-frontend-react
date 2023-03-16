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
            <div className="h-full  md:pb-4  bg-gray-50 dark:bg-gray-800 flex flex-col gap-2">
                <SideBarHeader/>
                <div className="flex  flex-col xl:flex-row gap-2">
                    {/* <div className="flex gap-2 font-bold grow xl:justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
                        </svg>  
                        <span className="grow xl:grow-0 hidden md:block">
                           ADD CONTACT 
                        </span>
                        
                    </div> */}
                    {/* <span className="hidden xl:block">
                        |    
                    </span> */}
                    
                    <div className="flex gap-2 font-bold grow justify-center cursor-pointer border-b border-gray-300 pb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                        </svg>

                        <div className=" xl:grow-0 hidden md:block">
                          NEW CHAT
                        </div>
                        {/* SI CLICKEAS UN NUEVO PANEL SE ABRE CPN EL CONTENIDO */}
                    </div>
                </div>
                <ul className="space-y-2 overflow-y-auto">
                    {renderedRooms}
                </ul>
            </div>
        </aside>

        </>
    )
}

export default SideBarUsers