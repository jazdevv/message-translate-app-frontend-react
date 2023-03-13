import { useGetLoggUserDataQuery } from './store/index';
import { Outlet } from "react-router-dom";

function LoggedApp(){
    const {data,isLoading} = useGetLoggUserDataQuery();
    if(isLoading === false){
        return <>
        <Outlet />
        </>
    }else if(isLoading===true){
        return "Loading"
    }
    
}

export default LoggedApp