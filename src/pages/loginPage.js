import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function LoginPage (){
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

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

          navigate('/') 
        }
        ).catch((err)=>{
            console.log(err)
        });
        // await fetch(`${serverUrl}/auth/login`,{
        //     method:'POST',
        //     headers:{'Content-Type':'application/json'},
        //     credentials: 'include',
        //     body: JSON.stringify({
        //         email,
        //         password
        //     })
        // })
        
        
    } 

    return <div>
        <form onSubmit={handleForm} className="flex flex-col w-40">
            <label>Email</label>
            <input value={email} onChange={handleEmailChange} className="w-full h- border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
            <label>Password</label>
            <input value={password} type='password' onChange={handlePasswordChange} className="w-full h-10 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
            <button type="submit" className="content-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Login</button>
        </form>
    </div>
}

export default LoginPage