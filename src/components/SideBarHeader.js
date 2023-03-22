import { useLoggUser } from "../hooks/useLoggUser"
import { useState } from "react";
import Modal from "./Modal";
import { GoX } from "react-icons/go";
import MyProfile from "./MyProfile";

function SideBarHeader(){
    //logg user 
    const [loggUser] = useLoggUser();
    const [openModalName,setOpenModalName] = useState(null);

    const ModalClose = ()=>{
        setOpenModalName(null)
    }

    let ModalComponent;
    if(openModalName==='settings'){
        ModalComponent = <Modal onClose={ModalClose} actionBar={<GoX className={'cursor-pointer'} onClick={ModalClose}/>}>Settings</Modal>
    }else if(openModalName==='myProfile'){
        ModalComponent = <Modal onClose={ModalClose} ><MyProfile onClose={ModalClose}/></Modal>
    }
    
    return <><div className="flex justify-center md:justify-between items-center  border-b border-gray-300 py-2 px-4 h-18">
                <div className="h-14 w-14 hidden md:block">
                    <img className="rounded-full h-full border border-gray-500 object-cover	" src={`https://messaging-app-images.s3.eu-west-3.amazonaws.com/${loggUser.profileImage}`}/>
                </div>
                <div className="flex gap-4 flex-col md:flex-row">
                    <svg onClick={()=>{setOpenModalName('settings')}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-6 md:h-6 cursor-pointer">
                        <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
                    </svg>
                    <svg onClick={()=>{setOpenModalName("myProfile")}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-6 md:h-6 cursor-pointer">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                </div>
                
                {openModalName&&ModalComponent}
                
    </div>
    <div className="flex  flex-col xl:flex-row gap-2">
    {/* <div className="flex gap-2 font-bold grow xl:justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z" />
        </svg>  
        <span className="grow xl:grow-0 hidden md:block">
           ADD CONTACT 
        </span>
        
    </div> */}
    {/* <span className="hidden xl:block">
        |    
    </span> */}
    
    <div className="flex gap-2 font-bold grow justify-center cursor-pointer border-b border-gray-300 pb-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>

        <div className=" xl:grow-0 hidden md:block">
          NEW CHAT
        </div>
        {/* SI CLICKEAS UN NUEVO PANEL SE ABRE CPN EL CONTENIDO */}
    </div>
</div></>
}

export default SideBarHeader