import { useDispatch } from "react-redux"
import { setIsLogged } from "../store"
import Cookies from 'js-cookie';
import { useEffect, useMemo } from "react";

function AppStart({children}){
    const dispatch = useDispatch();
    //useMemo for first render instead of useEffect because it gets rendered while the component, not after like useEffect
    useMemo(()=>{
        const jwtcookie = Cookies.get('acces_token');
        if(jwtcookie){
            dispatch(setIsLogged(true))
        }
    },[])

    return <>{children}</>
}

export default AppStart