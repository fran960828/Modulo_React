export interface IcoreElement {
    image:string,
    title:string,
    description:string
}

export  function CoreConceptsElement(prop:IcoreElement){
    return(
        <li>
            <img src={prop.image} alt="Imagen" />
            <h3>{prop.title}</h3>
            <p>{prop.description}</p>
        </li>
    )
}