import { useGetLoggUserDataQuery } from './store/index';
import { Outlet } from "react-router-dom";
import LoadingSvg from './svg/loading-svg'

function LoggedApp(){
    const {data,isLoading} = useGetLoggUserDataQuery();
    if(isLoading === false){
        return <>
        <Outlet />
        </>
    }else if(isLoading===true){
        return <LoadingSvg type="cubes"/>
    }
    
}

export default LoggedApp