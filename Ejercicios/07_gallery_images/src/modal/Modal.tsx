import { useEffect, useRef } from "react";
import type { Imodal } from "../core/core_modules";
import { createPortal } from "react-dom";





export function Modal({open,children,onClose}:Imodal){
    const dialog=useRef<HTMLDialogElement>(null)
    useEffect(()=>{
        if (open){
            dialog.current?.showModal()
        }else {
            dialog.current?.close()
        }
    }
        ,[open])
        
    return createPortal(
        <dialog ref={dialog} onClose={onClose} className="min-w-lg mx-auto my-auto p-0 z-2 bg-[#d5c7bc] rounded-lg shadow-[0_2px_8px_rgba(0_0_0_0.26)] modal">
        {open ? children:null}

        </dialog>,document.getElementById('modal')!
    )

}