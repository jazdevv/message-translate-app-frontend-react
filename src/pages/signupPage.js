import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { setIsLogged } from "../store";
import { useDispatch } from "react-redux";
import axios from "axios"
import { CountryDropdown } from "react-country-region-selector";
import Flag from "react-world-flags";

function SignupPage(){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [username,setUsername] = useState('')
    const [translateMessages, setTranslateMessages] = useState(true);
    const [translateTo,setTranslateTo] = useState('EN');
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const serverUrl = useSelector((state)=> state.serverUrl)

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handleChangeTranslateMessages = () => {
        
        setTranslateMessages(!translateMessages);
        
    }
    const handleForm = async (event) => {
        event.preventDefault();
        axios.post(`${serverUrl}/auth/signup`,{email,password,username,translateMessages,translateTo}, {withCredentials: true}).then((res)=>{
            dispatch(setIsLogged(true));
            navigate('/'); 
        }
        ).catch((err)=>{
            console.log(err)
        });
        
        
    } 
    
    let translateMessagesBtn;
    if(translateMessages===true){
        translateMessagesBtn = <input type="checkbox" value="" className="sr-only peer"  onChange={()=>{}} checked/>
    }else if(translateMessages===false){
        translateMessagesBtn = <input type="checkbox" value="" className="sr-only peer" onChange={()=>{}}/>
    }
    return <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
    <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <h1 className="font-bold text-center text-2xl mb-5"></h1>  
      <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div className="px-5 py-7">
            <form onSubmit={handleForm}>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                <input value={email} onChange={handleEmailChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"/>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                <input value={password} type='password' onChange={handlePasswordChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"/>
                <label className="font-semibold text-sm text-gray-600 pb-1 block">Username</label>
                <input value={username} onChange={handleUsernameChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"/>
                <div>
                    <div className="mb-6">                    
                        <label htmlFor="text" className="font-semibold text-sm text-gray-600 pb-1 block">Translate message Automatically?</label>
                        <label className="relative inline-flex items-center cursor-pointer" >
                            {translateMessagesBtn}
                            <div onClick={handleChangeTranslateMessages} className="w-11 h-6 bg-gray-200 rounded-full  dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="text" className="font-semibold text-sm text-gray-600 pb-1 block">Translate messages to... </label>
                        <div className="flex w-full gap-2">
                            <CountryDropdown value={translateTo}  onChange={(val)=>setTranslateTo(val)} valueType="short" classes="text-white bg-blue-700 hover:bg-blue-800 focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-48 h-3/4" blacklist={[]} whitelist={[]}/>
                            <div className="w-24">
                                <Flag code={translateTo} />
                            </div>  
                        </div>
                        
                    </div>
                </div>
                <button onClick={handleForm} type="button" className="transition duration-200 bg-blue-600 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                    <span className="inline-block mr-2">Signup</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>  
                </button>
            </form>
        </div>
        <div className="py-5">
          <div className="grid grid-cols-2 gap-1">
            <div className="text-center sm:text-left whitespace-nowrap ">
            <Link to={"/auth/login"}><button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  <span className="inline-block ml-1 bg-blue-600 p-2 text-white rounded-lg">LOGIN</span>
              </button></Link>
            </div>
            <div className="text-center sm:text-right  whitespace-nowrap">
              <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-bottom	">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="inline-block ml-1">Help</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
    // return <div>
    //     <form onSubmit={handleForm} className="flex flex-col w-40">
    //         <label>Email</label>
    //         <input value={email} onChange={handleEmailChange} className="w-20 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
    //         <label>Password</label>
    //         <input value={password} onChange={handlePasswordChange} className="w-20 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
    //         <label>Username</label>
    //         <input value={username} onChange={handleUsernameChange} className="w-20 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
    //         <button type="submit" className="content-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Signup</button>

    //     </form>
    // </div>
}

export default SignupPage