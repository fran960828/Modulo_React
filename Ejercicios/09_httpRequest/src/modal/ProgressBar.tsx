import { useEffect, useState } from "react";
import type { IprogressBar } from "../core/core_modules";

export function ProgressBar({Timer}:IprogressBar){
    const [timeRemaining,setTimeRemining]=useState<number>(Timer)

    useEffect(()=>{
        const timer=setInterval(() => {
        setTimeRemining((prevValue:number)=>prevValue-10)
    }, 10);
    return ()=>{
        clearInterval(timer)
    }
    },[])
    
    return (<progress value={timeRemaining} max={Timer} />);
}