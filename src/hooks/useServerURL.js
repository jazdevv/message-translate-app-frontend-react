import { useSelector } from "react-redux"

function useServerURL(){
    const serverUrl = useSelector((state)=> state.serverUrl)
    return serverUrl
}

export {useServerURL}