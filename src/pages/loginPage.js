import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setIsLogged } from "../store";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios"
import { Link } from "react-router-dom";

function LoginPage (){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const serverUrl = useSelector((state)=> state.serverUrl)

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    

    const handleForm = async (event) => {
        event.preventDefault();
        axios.post(`${serverUrl}/auth/login`,{email,password}, {withCredentials: true}).then((res)=>{
            //set redux isLogged state to true if login suucces
            dispatch(setIsLogged(true));
            //add the cookies to browser aplicacion 
            Cookies.set('acces_token',res.data.acces_token)
            navigate('/');
        }
        ).catch((err)=>{
            console.log(err)
        });
        
        
    } 

    return <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
    <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
      <h1 class="font-bold text-center text-2xl mb-5"></h1>  
      <div class="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
        <div class="px-5 py-7">
            <form>
                <label class="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                <input value={email} onChange={handleEmailChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"/>
                <label class="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                <input value={password} type='password' onChange={handlePasswordChange} className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"/>
                <button onClick={handleForm} type="button" class="transition duration-200 bg-blue-600 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                    <span class="inline-block mr-2">Login</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>  
                </button>
            </form>
        </div>
        <div class="py-5">
          <div class="grid grid-cols-2 gap-1">
            <div class="text-center sm:text-left whitespace-nowrap ">
            <Link to={"/auth/signup"}><button class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-top">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  <span class="inline-block ml-1 bg-blue-600 p-2 text-white rounded-lg">SIGNUP</span>
              </button></Link>
            </div>
            <div class="text-center sm:text-right  whitespace-nowrap">
              <button class="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block align-text-bottom	">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span class="inline-block ml-1">Help</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
    
}

export default LoginPage