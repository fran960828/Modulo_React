import './ExampleTag.css'
export interface IexampleTag{
    title:string,
    description:string,
    code:string
}
export function ExampleTag(prop:IexampleTag){
    return (
        <div id="tab-content">
            <h3>{prop.title}</h3>
            <p>{prop.description}</p>
            <code>{prop.code}</code>
        </div>
    )
}