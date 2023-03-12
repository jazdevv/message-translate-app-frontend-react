import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { setIsLogged } from "../store";
import { useEffect } from "react";

function ProtectedRoute({children}){
    const isLogged = useSelector((state)=>state.isLogged);
    const navigate = useNavigate();
   useEffect(()=>{
        if(isLogged.isLogged===false){
            navigate('/auth/login')
        }
    })

    if(isLogged.isLogged===true){
        return <div>{children}</div>
    }
    
    
}

export default ProtectedRoute