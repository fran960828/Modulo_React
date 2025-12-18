import { useEffect, useState } from "react";
import type{ Iprogress } from "../../Core/Core";


export function ProgressBar({timeOut,onSkip,mode}:Iprogress){
    const [timeRemaining,setTimeRemaining]=useState<number>(timeOut)

    useEffect(()=>{
        const timer=setTimeout(onSkip,timeOut)

        return ()=>{
            clearTimeout(timer)
        }
    },[timeOut,onSkip])
    useEffect(()=>{
        const progressBar=setInterval(()=>{
            setTimeRemaining((prevTimer)=>
                prevTimer-100
            )
        },100)
        return ()=>{
            clearInterval(progressBar)
        }
    },[])


    return (
        <progress id="question-time" max={timeOut} value={timeRemaining} className={mode}/>
    )

}