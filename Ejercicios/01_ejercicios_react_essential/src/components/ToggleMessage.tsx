interface ItoggleProp {
    message:string,
    status:boolean,
    toggleIn:()=>void
}

export default function ToggleMessage(prop:ItoggleProp){
    return (
        <div>
            {prop.status ? <p>{prop.message}</p>:null}
            <button onClick={prop.toggleIn}>
                toggleMessage
            </button>
        </div>
    )
}