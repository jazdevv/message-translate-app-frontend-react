import { useLoggUser } from "../hooks/useLoggUser";
import { GoX } from "react-icons/go";
import { useState } from "react";
import { CountryDropdown } from 'react-country-region-selector';
import Flag from 'react-world-flags'
import axios from "axios";
import { useServerURL } from "../hooks/useServerURL";

function MyConfig({onClose}){
    const [loggUser] = useLoggUser();
    const serverUrl = useServerURL();
    const [translateMessages, setTranslateMessages] = useState(loggUser.translateMessages);
    const [translateTo,setTranslateTo] = useState(loggUser.translateTo);


    const updateProfile = ()=>{

        axios.post(`${serverUrl}/auth/UpdateMyConfig`, {translateTo,translateMessages} , {withCredentials: true}).then(onClose());

    }
    console.log(translateMessages);
    const handleChangeTranslateMessages = () => {
        
        setTranslateMessages(!translateMessages);
    }

    return <>
            <div className="flex justify-between w-full items-center">
                <GoX className={'cursor-pointer'} onClick={onClose}/>                   
                <button onClick={updateProfile} type="submit" className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm   px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save Settings</button>  
            </div>
            <form className="flex flex-col gap-6 ">
                <div>
                    <div className="mb-6">                    
                        <label htmlFor="text" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Messages automatically translated?</label>
                        <label className="relative inline-flex items-center cursor-pointer" >
                            {translateMessages ? <input type="checkbox" value="" className="sr-only peer" checked onChange={()=>{}}/> : <input type="checkbox" value="" className="sr-only peer" onChange={()=>{}}/>}
                            <div onClick={handleChangeTranslateMessages} className="w-11 h-6 bg-gray-200 rounded-full  dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="text" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Translate messages to... </label>
                        <div className="flex w-full gap-2">
                            <CountryDropdown value={translateTo} onChange={(val)=>setTranslateTo(val)} valueType="short" classes="text-white bg-blue-700 hover:bg-blue-800 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-48 h-3/4" blacklist={[]} whitelist={[]}/>
                            <div className="w-24">
                                <Flag code={translateTo} />
                            </div>  
                        </div>
                        
                    </div>
                </div>
                
            </form>
    </>
}

export default MyConfig