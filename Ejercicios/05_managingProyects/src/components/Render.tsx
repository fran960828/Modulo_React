import { useRef, useState } from "react";
import type { Iproyect } from "../modal/modal";

interface Irender {
  proyect: Iproyect;
  onDelete: (title: string) => void;
}

export function Render({ proyect, onDelete }: Irender) {
  const [task, setTask] = useState<string[]>([]);
  const newTask = useRef<HTMLInputElement | null>(null);
  function handleNewTask() {
    const value = newTask.current!.value.trim();
    if (!value) return;

    setTask((prevTask) => [...prevTask, value]);
    newTask.current!.value = "";
  }

  function deleteTask(item: string) {
    setTask((prev) => prev.filter((t) => t !== item));
  }

  const dateObject = new Date(proyect.date);

  // 2. Definir las opciones de formato (Mes Día, Año)
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // 3. Aplicar el formato deseado usando el idioma inglés ('en-US')
  //    para que el orden sea Mes Día, Año.
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  return (
    <>
      <div className="flex flex-col gap-4 mx-[3%] my-[5%] w-full">
        <div
          id="title"
          className="flex flex-row justify-between items-center w-[40%]"
        >
          <h1 className="text-4xl font-extrabold text-stone-600 ">
            {proyect.title}
          </h1>
          <button
            className="text-[1rem] text-stone-600"
            onClick={() => onDelete(proyect.title)}
          >
            delete
          </button>
        </div>
        <p className="text-xl text-stone-400 font-bold">{formattedDate}</p>
        <p className="text-xl text-stone-600 py-2 border-b-2 border-stone-700 w-fit">
          {proyect.description}
        </p>
        <main className="flex flex-col gap-4 mt-8">
          <h2 className="font-extrabold text-3xl text-stone-900">Task</h2>
          <p className="flex flex-row justify-start items-center ">
            <input
              ref={newTask}
              type="text"
              className="bg-stone-200 border-stone-300 rounded-tl-sm rounded-bl-sm text-stone-600 w-[40%] p-2 border-b-2 focus:outline-none focus:border-b-stone-800"
            />
            <button
              onClick={handleNewTask}
              className="text-xl text-stone-200 bg-stone-700 text-center px-6 py-2 rounded-tr-sm rounded-br-sm"
            >
              Add Task
            </button>
          </p>
          <div id="task__items" className="text-stone-400 w-[33%]">
            {task.map((item) => (
              <li
                key={crypto.randomUUID()}
                className="m-0 p-0 list-none flex flex-row justify-between items-center px-2 py-8 "
              >
                <span className="text-stone-500">{item}</span>
                <button
                  onClick={() => deleteTask(item)}
                  className="text-stone-500 hover:text-red-700"
                >
                  clear
                </button>
              </li>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
