import { useGetLoggUserDataQuery } from './store/index';
import { Outlet } from "react-router-dom";

function LoggedApp(){
    useGetLoggUserDataQuery();
    return <>
    <Outlet />
    </>
}

export default LoggedApp