
import type { Iproyect } from "../modal/modal";

interface Iaside {
  createdProyects: Iproyect[];
  onCreate: () => void;
  onRenderProyect: (proy: Iproyect) => void;
}

export function Aside({ createdProyects, onCreate, onRenderProyect }: Iaside) {
  

  return (
    <section
      id="container__proyects"
      className="flex flex-col w-[25%] h-screen bg-neutral-900 rounded-tr-2xl rounded-br-2xl mt-8 mb-8 px-8 py-16 gap-2"
    >
      <h2 className="font-extrabold text-center text-2xl text-white">
        YOUR PROYECTS
      </h2>
      <button
        onClick={onCreate}
        className="text-center text-stone-500 mt-2 bg-stone-700 px-1 py-2 rounded hover:text-stone-100"
      >
        Add Proyect
      </button>
      {createdProyects.map((proy) => (
        <button
          key={proy.id}
          className="text-center text-stone-500 mt-2 hover:bg-stone-700 px-1 py-2 rounded hover:text-stone-100"
          onClick={() => onRenderProyect(proy)}
        >
          {proy.title}
        </button>
      ))}
    </section>
  );
}
