import { useSelector } from "react-redux"
import { useGetLoggUserDataQuery } from '../store/index';
const useLoggUser = () => {
    const {data: user} = useGetLoggUserDataQuery();
    return [user]
}

export { useLoggUser }