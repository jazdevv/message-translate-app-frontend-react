import { useEffect, useState } from "react"
import { GoX } from "react-icons/go"
import SearchSvg from './../svg/search-svg'
import {useServerURL} from './../hooks/useServerURL'
import axios from "axios"
import { Link } from "react-router-dom"
import SideBarUser from "./SideBarUser"

function AddChat({onClose}){
    const [users,setUsers] = useState([]);
    const [searchValue,setSearchValue] = useState('');
    const serverUrl = useServerURL();
    
    const onChangeInput = (event) => {
        setSearchValue(event.target.value);
    }

    useEffect(()=>{
        if(searchValue.length === 0){
            return
        }
        axios.get(`${serverUrl}/auth/searchUsers/${searchValue}`,{withCredentials:true}).then(res=>{setUsers(res.data)});
    },[searchValue])

    const renderedUsers = users.map((user)=>{
        return <Link to={`/chat/?u=${user.id}`} key={user.userid} onClick={onClose}>
            <div className="flex p-1 gap-2 hover:bg-gray-100 h-20 w-full">
                <div className=" flex items-center pb-1 h-full">
                    <div className="p-0 md:p-2 h-16 w-16">
                        <img className="rounded-full object-cover " src={`https://messaging-app-images.s3.eu-west-3.amazonaws.com/${user.profileImage}`}/>    
                    </div>
                </div>
                <div className="w-full  flex flex-col justify-center pb-1 w-full ">
                    <div className="flex justify-between ">
                        <div className="text-lg flex items-center text-xl font-medium text-gray-700 capitalize">{user.username}</div>
                    </div>
                </div>
            </div>
        </Link>
    })
    
    return<>
        <div className="flex justify-between w-full items-center mb-4">
                <GoX className={'cursor-pointer'} onClick={onClose}/>                   
        </div>
        <form>   
            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input onChange={onChangeInput} value={searchValue} type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Who you want to talk?" required/>
                <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            </div>
    </form>
    <div className="w-full h-4/5 flex content-center">
            {users.length > 0 && searchValue.length > 0 ? <div className="flex flex-col w-full overflow-auto">{renderedUsers}</div> : <div className="flex w-full justify-center "> {<SearchSvg/>}</div>}

    </div>
    </> 
}

export default AddChat