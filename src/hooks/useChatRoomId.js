import { useSelector, useDispatch } from "react-redux";
import { setRoomId } from "../store";
function useChatRoomId(){
    const dispatch = useDispatch();
    const getChatRoomId = useSelector((state)=>state.chatRoomId.id);

    function setChatRoomid(roomid){
        dispatch(setRoomId(roomid));
    }

    return {getChatRoomId,setChatRoomid}
}

export {useChatRoomId}