import { useState } from "react";

interface IuserProp{
    label:string;
    value:number;
    onChangeValue:()=>void
}

export default function UserInput({label}:IuserProp){
    const [initialValue,setInitialValue]=useState(0)
    function handleValue(event:any){
        setInitialValue(event.target.value)
    }


    return (
        <li className='input-item'>
            <label htmlFor={label}>{label}</label>
            <input type="number" required id={label} value={initialValue} onChange={handleValue} />
        </li>
    )
}