import './App.css'
import { Header } from './Header/Header'
import { CoreConcepts } from './CoreConcepts/CoreConcepts'
import { Example } from './Examples/Example'
function App() {
  

  return (
    <>
      <Header/>
      <main>
      <h2>Core Concepts</h2>
        <CoreConcepts/>
        <Example/>
      </main>
    </>
  )
}

export default App
