import { WelcomeBox } from "./components/WelcomeBox";
import { UserInfo } from "./components/UserInfo";
import ReactImage from "./assets/react.svg";
import "./App.css";
import { AlertMessage } from "./components/AlertMessage";
import { ActionButton } from "./components/ActionButton";
import { TagChildren } from "./components/TagChildren";
import { Contador } from "./components/Contador";
import ToggleMessage from "./components/ToggleMessage";
import { MultiActionButton } from "./components/MultiActionButton";
import { LoginBox, LoginForm } from "./components/LoginBox";
import { SelectedBox } from "./components/SelectedBox";
import { useState } from "react";

function App() {
  const [valorActual, setvalorActual] = useState(parseInt("0"));
  const [mostrar, setMostrar] = useState(false);
  const [showHidden, setShowHidden] = useState(false);
  const [box, setBox] = useState("unselected");
  function onAction() {
    console.log("Cambio de color ejecutado");
  }
  function control() {
    setMostrar(!mostrar);
  }
  function handleSelectColor(color: string) {
    console.log(color);
  }
  function showLogin() {
    setShowHidden(!showHidden);
  }
  function change_border(box: string) {
    box === "unselected" && setBox("selected");
    box === "selected" && setBox("unselected");
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
      <ToggleMessage
        message="parrafo que aparece y desaparece"
        status={mostrar}
        toggleIn={control}
      />
      <div>
        <MultiActionButton onSelectColor={() => handleSelectColor("red")}>
          red
        </MultiActionButton>
        <MultiActionButton onSelectColor={() => handleSelectColor("blue")}>
          blue
        </MultiActionButton>
        <MultiActionButton onSelectColor={() => handleSelectColor("green")}>
          green
        </MultiActionButton>
      </div>
      <LoginBox showHide={showLogin}>Show/Hidden Login form</LoginBox>
      {showHidden ? <LoginForm /> : null}

      <SelectedBox clase={box} changeBorder={() => change_border(box)} />
    </>
  );
}

export default App;
