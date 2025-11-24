import { WelcomeBox } from "./components/WelcomeBox";
import { UserInfo } from "./components/UserInfo";
import ReactImage from "./assets/react.svg";
import "./App.css";
import { AlertMessage } from "./components/AlertMessage";
import { ActionButton } from "./components/ActionButton";
import { TagChildren } from "./components/TagChildren";
import { Contador } from "./components/Contador";
import { useState } from "react";
function App() {
  const [valorActual, setvalorActual] = useState(parseInt("0"));
  function onAction() {
    console.log("Cambio de color ejecutado");
  }
  return (
    <>
      <img src={ReactImage} alt="Foto Inicial" />
      <WelcomeBox />
      <UserInfo nombre="Francisco" apellidos="Navarro Guardiola" />
      <AlertMessage message="Primer mensaje enviado" resultado="success" />
      <AlertMessage message="Segundo mensaje enviado" resultado="failed" />
      <ActionButton label="Cambiar de color" onAction={onAction} />
      <TagChildren>
        <p>Esto es una etiqueta introducida entre etiquetas children</p>
      </TagChildren>
      <Contador
        label={valorActual}
        incrementador={() => setvalorActual(valorActual + 1)}
      />
    </>
  );
}

export default App;
