import { useState } from "react";
import type { Iinvestment } from "./utils/Investment";
import UserInput from "./components/UserInput";
import { Investment } from "./utils/Investment";

const valoresInputs: Iinvestment = {
  initialInvestment: 0,
  annualInvestment: 0,
  expectedReturn: 0,
  duration: 0,
};

function App() {
  const [initialValue, setInitialValue] = useState(valoresInputs);

  function handleValues(label: string, event: any) {
    setInitialValue((prevInputs) => {
      return { ...prevInputs, [label]: Number(event.target.value) };
    });
  }

  return (
    <>
      <div id="input-container">
        <ol id="user-input">
          <UserInput
            label="initialInvestment"
            value={initialValue["initialInvestment"]}
            onChangeValue={handleValues}
          />
          <UserInput
            label="annualInvestment"
            value={initialValue["annualInvestment"]}
            onChangeValue={handleValues}
          />
          <UserInput
            label="expectedReturn"
            value={initialValue["expectedReturn"]}
            onChangeValue={handleValues}
          />
          <UserInput
            label="duration"
            value={initialValue["duration"]}
            onChangeValue={handleValues}
          />
        </ol>
      </div>
      <Investment
        initialInvestment={+initialValue.initialInvestment}
        annualInvestment={+initialValue.annualInvestment}
        expectedReturn={+initialValue.expectedReturn}
        duration={+initialValue.duration}
      />
    </>
  );
}

export default App;
