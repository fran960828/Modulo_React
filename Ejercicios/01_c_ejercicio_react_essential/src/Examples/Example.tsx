import { useState } from 'react'
import './Example.css'
import { ExampleButton } from './complements/ExampleButton'
import { EXAMPLES } from '../components/data'
import { ExampleTag } from './complements/ExampleTag'
type ExampleKey = keyof typeof EXAMPLES

export function Example(){
    const [estado, setEstado] = useState<ExampleKey | ''>('')

    function handleButtons(valor:ExampleKey){
        setEstado(valor)
    }
    
    return (
        <>
        <section id="examples">
            <h2>Examples</h2>
            <menu>
                <ExampleButton fnButton={()=>handleButtons('components')}>Complements</ExampleButton>
                <ExampleButton fnButton={()=>handleButtons('jsx')}>JSX</ExampleButton>
                <ExampleButton fnButton={()=>handleButtons('props')}>Props</ExampleButton>
                <ExampleButton fnButton={()=>handleButtons('state')}>States</ExampleButton>
            </menu>
            {estado && <ExampleTag title={EXAMPLES[estado].title} description={EXAMPLES[estado].description} code={EXAMPLES[estado].code}/>}
        </section>
        </>
    )
}