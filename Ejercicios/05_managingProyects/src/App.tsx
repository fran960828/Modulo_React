import { useState } from "react";
import { CreateProyects } from "./components/CreateProyects";
import { FormProyect } from "./components/FormProyect";
import { Aside } from "./components/Aside";
import { Render } from "./components/Render";
import type { Iproyect } from "./modal/modal";

function App() {
  const [proyect, setProyect] = useState<string>("base");
  const [createdProyects, setCreatedProyects] = useState<Iproyect[]>([]);
  function handleCreateProyect() {
    setProyect("formProyect");
  }
  function handleBaseProyect() {
    setProyect("base");
  }
  function handleSaveProyect(proyect: Iproyect) {
    setCreatedProyects((prevProyect) => [...prevProyect, proyect]);
    setProyect("base");
  }
  function handleShowProyect(proyect: Iproyect) {
    setProyect(proyect.title);
  }
  function handleDeleteProyect(title: string) {
    setCreatedProyects((prev) => prev.filter((p) => p.title !== title));
    setProyect("base"); // volver a pantalla base después de borrar
  }

  return (
    <>
      <div id="container" className="flex flex-row flex-nowrap w-full h-full">
        <Aside
          createdProyects={createdProyects}
          onCreate={handleCreateProyect}
          onRenderProyect={handleShowProyect}
        />
        {proyect === "base" && (
          <CreateProyects onCreate={handleCreateProyect} />
        )}
        {proyect === "formProyect" && (
          <FormProyect
            onCancel={handleBaseProyect}
            onSave={handleSaveProyect}
          />
        )}
        {createdProyects.map(
          (proy) =>
            proyect === proy.title && (
              <Render
                proyect={proy}
                onDelete={() => handleDeleteProyect(proy.title)}
              />
            )
        )}
      </div>
    </>
  );
}

export default App;
