import { useGetLoggUserDataQuery } from './store/index';
import { Outlet } from "react-router-dom";

function LoggedApp(){
    const {data} = useGetLoggUserDataQuery();
    console.log(data)
    return <>
    <Outlet />
    </>
}

export default LoggedApp