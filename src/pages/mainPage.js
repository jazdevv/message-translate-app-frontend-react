import React, { useState, useEffect } from 'react';
import { Link,Outlet } from "react-router-dom"



function MainPage(){
    
    // ONLY FOR DEV
    const tempChatRooms = <>
        <Link to={'/chat/3'}><div className='p-5 border-4 border-indigo-500/100  cursor-pointer'>DEV USER1</div></Link>
        <Link to={'/chat/1'}><div className='p-5 border-4 border-indigo-500/100 cursor-pointer'>DEV USER2</div></Link>
    </>

    return <div className="w-24 flex flex-col">
        {tempChatRooms}
        { <Outlet /> }
    </div>
}// OUTLET === CHAT COMPONENT 

export default MainPage