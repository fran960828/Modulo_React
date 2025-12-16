import { useEffect } from "react";
import type { IbuttonActions } from "../core/core_modules";
import { ProgressBar } from "./ProgressBar";

const TIMER=3000

export function DeleteConfirmation({onConfirm,onCancel}:IbuttonActions){

    useEffect(()=>{
        const timer=setTimeout(() => {
            onConfirm()
        }, TIMER);
        
        return ()=>{
            clearTimeout(timer)
        }


    },[onConfirm])

    return(
        <div className=" p-4">
            <h2 className="font-[Raleway] font-extrabold text-2xl m-0 p-0 text-[#5d0909]">Are you Sure?</h2>
            <p className="mx-auto my-0 text-lg max-w-3/4 text-[#804242]">You really want to remove this place?</p>
            <div className="mt-4 flex flex-row justify-end gap-4">
                <button className="bg-transparent border-none p-0 font-[Raleway] text-[16px] text-[#5d0909]" onClick={onCancel}>Cancel</button>
                <button className="cursor-pointer font-[Raleway] text-[16px] py-2 px-6 border-none rounded-sm bg-[#5d0909] shadow-[0_1px_4px_rbg(0_0_0_0.4) text-white hover:bg-[#3e0505] focus:bg-[#3e0505]" onClick={onConfirm}>Confirm</button>
            </div>
            <ProgressBar Timer={TIMER} />
        </div>
    )
}

