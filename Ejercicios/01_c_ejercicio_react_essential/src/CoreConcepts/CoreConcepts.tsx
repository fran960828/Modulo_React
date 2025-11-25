import './CoreConcepts.css'
import './components/CoreConceptsElement'
import { CORE_CONCEPTS } from '../components/data'
import {CoreConceptsElement} from './components/CoreConceptsElement'
import type { IcoreElement } from './components/CoreConceptsElement'
export function CoreConcepts(){
    return (
        <>
        <section id="core-concepts">
            <ul>
                {
                    CORE_CONCEPTS.map((element:IcoreElement)=>
                        <CoreConceptsElement key={element.title} image={element.image} title={element.title} description={element.description}/>
                    )
                }
            </ul>

        </section>
        </>
    )
}