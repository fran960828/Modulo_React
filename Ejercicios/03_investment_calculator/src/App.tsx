import { useState } from "react"
import UserInput from "./components/UserInput"

const valoresInputs={
initial_investment:0,
anual_investment:0,
expected_return:0,
duration:0
}
type IinputsProp=typeof valoresInputs
function App() {
  const [initialValue,setInitialValue]=useState(valoresInputs)
  return (
    <>
    <div id="input-container">
      <ol id="user-input">
        <UserInput label="initial_investment" value={initialValue['initial_investment']} onChangeValue={setInitialValue}/>
        <UserInput label="anual_investment" value={initialValue['anual_investment']} onChangeValue={setInitialValue}/>
        <UserInput label="expected_return" value={initialValue['expected_return']} onChangeValue={setInitialValue}/>
        <UserInput label="duration" value={initialValue['duration']} onChangeValue={setInitialValue}/>
      </ol>
    </div>
      
    </>
  )
}

export default App
