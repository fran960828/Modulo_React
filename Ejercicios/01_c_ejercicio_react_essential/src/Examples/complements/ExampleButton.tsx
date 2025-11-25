export interface IbuttonProp {
    children:React.ReactNode,
    fnButton:()=>void
}

export function ExampleButton(prop:IbuttonProp){
    return(
        <button onClick={prop.fnButton}>{prop.children}</button>
    )
}