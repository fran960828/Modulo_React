import imageHeader from '../assets/react-core-concepts.png'
import './Header.css'

export function Header(){
    return (
        <header>
            <img src={imageHeader} alt="Imagen del header" />
            <h1>REACT ESSENTIALS</h1>
            <p>Core React Concept you will need for almost any app you are going to build</p>
        </header>
    )
}