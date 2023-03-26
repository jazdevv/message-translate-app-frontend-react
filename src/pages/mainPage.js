import React, { useState, useEffect } from 'react';
import { Link,Outlet } from "react-router-dom"
import SideBarUsers from '../components/SideBarUsers';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLoggUser } from '../hooks/useLoggUser';
import { useDispatch } from 'react-redux';
import { initialSetRooms } from '../store';
import LoadingSvg from '../svg/loading-svg';

function MainPage(){
    const serverUrl = useSelector((state)=> state.serverUrl);
    const rooms = useSelector((state)=> state.rooms);
    const [loggUser] = useLoggUser();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const getRooms = async ()=> {
            const {data} = await axios.get(`${serverUrl}/messages/rooms`, {withCredentials: true})
            console.log("rooms",data)
            dispatch(initialSetRooms(data));
        }
        
        getRooms();

    },[])

        
    if(rooms.loading===true){
        return <LoadingSvg type="cubes"/>
    }else{
      return <div className="flex">
        <SideBarUsers rooms={rooms.rooms}/>
        <Outlet /> 
    </div>  
    }
    
}// OUTLET === CHAT COMPONENT 

export default MainPage