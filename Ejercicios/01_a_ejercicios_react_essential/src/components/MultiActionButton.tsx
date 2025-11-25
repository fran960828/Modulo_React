
interface ImultiActionColor {
    children:React.ReactNode,
    onSelectColor:()=>void
}
export function MultiActionButton(prop:ImultiActionColor){
    return (
        <div>
            <button onClick={prop.onSelectColor}>{prop.children}</button>    
        </div>
    )
}