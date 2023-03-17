import { useRef, useState } from "react";
import { useLoggUser } from "../hooks/useLoggUser"
import { GoX } from "react-icons/go";
import { useServerURL } from "../hooks/useServerURL";
import axios from "axios";

function MyProfile({onClose}){
    const serverUrl = useServerURL();
    const [loggUser] = useLoggUser();
    //profile data
    const [username,setUsername] = useState(loggUser.username);
    const [status,setStatus] = useState(loggUser.status)
    //image to show
    const [profileImage, setProfileImage] = useState(`https://messaging-app-images.s3.eu-west-3.amazonaws.com/${loggUser.profileImage}`)
    //image to add to the request
    const [updatedProfileImage, setUpdatedProfileImage] = useState(null)
    const File = useRef(null);

    const handleClick = ()=>{
        File.current.click();
    }

    const addPhoto = (event) => {
        setUpdatedProfileImage(event.target.files[0]);
        setProfileImage(URL.createObjectURL(event.target.files[0]));
    }
    
    const updateProfile = ()=>{
        const formData = new FormData();
        formData.append('username',username);
        formData.append('status',status);
        formData.append('file',updatedProfileImage)
        axios.post(`${serverUrl}/auth/UpdateMe`, formData , {withCredentials: true,headers:{"Content-Type":"multipart/form-data"}}).then(onClose())
    }

    const handleChangeUsername = (event)=>{
        setUsername(event.target.value);
    }

    const handleChangeStatus = (event)=>{
        if(event.target.value.length>100){
            return
        }
        setStatus(event.target.value)
    }

    let statusColor;
    if(status.length < 71){
        console.log('green')
        statusColor ='text-green-500 font-bold'
    }
    if(  status.length > 70 && 90 > status.length){
        console.log("orange")
        statusColor ='text-orange-500 font-bold'
    }
    if(status.length > 89 && 101 > status.length){
        console.log('red')
        statusColor ='text-red-500 font-bold'
    }

    return <>
            <div className="flex justify-between w-full items-center">
                <GoX className={'cursor-pointer'} onClick={onClose}/>                   
                <button onClick={updateProfile} type="submit" className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Change Profile</button>  
            </div>
            <form className="flex flex-col gap-6 ">
                <div className="flex justify-center h-48 w-48 mx-auto">
                    <input ref={File} onChange={addPhoto}className="hidden" type="file" accept="image/*"/>
                    <div onClick={handleClick} className="h-48 flex flex-col gap-2 relative cursor-pointer">
                        <div className="absolute inset-0 bg-black opacity-50 rounded-full"></div>
                        <img className="h-full w-full  rounded-full cursor-pointer object-cover"  src={profileImage}/>
                        <div className="absolute translate-y-14 translate-x-14 bg-black rounded-full p-2 opacity-50">
                            {/* <svg xmlns="http://www.w3.org/2000/svg" className=" w-16 h-16  opacity-100" fill="none" viewBox="0 0 24 24" strokWidth="1.5" stroke="white">
                                <path strokLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                                <path strokLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                            </svg> */}

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className=" w-16 h-16  opacity-100" fill="white" >
                            <path d="M12 9a3.75 3.75 0 100 7.5A3.75 3.75 0 0012 9z" />
                            <path fillRule="evenodd" d="M9.344 3.071a49.52 49.52 0 015.312 0c.967.052 1.83.585 2.332 1.39l.821 1.317c.24.383.645.643 1.11.71.386.054.77.113 1.152.177 1.432.239 2.429 1.493 2.429 2.909V18a3 3 0 01-3 3h-15a3 3 0 01-3-3V9.574c0-1.416.997-2.67 2.429-2.909.382-.064.766-.123 1.151-.178a1.56 1.56 0 001.11-.71l.822-1.315a2.942 2.942 0 012.332-1.39zM6.75 12.75a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0zm12-1.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                            </svg>
                        </div>

                    </div>
                </div>
                <div>
                    <div className="mb-6">
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">UserName</label>
                    <input value={username} onChange={handleChangeUsername} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                    </div>
                    <div className="mb-6">
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status <span className={statusColor}>{100-status.length}</span></label>
                    <input value={status} onChange={handleChangeStatus} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  required/>
                    </div>
                    <div className="mb-6">
                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                    <input value={loggUser.email} type="text" id="password" className="bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" readOnly/>
                    </div>
                </div>
                
            </form>
            </>
}

export default MyProfile