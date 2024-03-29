import { useEffect } from "react"
import { createPortal } from "react-dom"

function Modal({onClose,children,actionBar}){
    useEffect(()=>{
            document.body.classList.add('overflow-hidden')

            return () => {
                document.body.classList.remove('overflow-hidden')
            }
        },[])
        
        return createPortal(
            <div> 
                <div onClick={onClose} className="fixed inset-0 bg-gray-300 opacity-80"></div> 
                <div className="fixed inset-10 md:inset-x-1/4 inset-y-10 p-10 bg-white">
                    <div className="flex flex-col justify-between h-full bg-white">
                        <div className="flex">{actionBar}</div>  
                        <div className="h-full w-full overflow-y-auto">{children}</div>
                    </div>
                    
                </div>
            </div>,
            document.querySelector('.modal-container')
        )
    
}

export default Modal