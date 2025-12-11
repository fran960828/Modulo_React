import logo from "/logo.png";
import type { IcreateProyect } from "../modal/modal";

export function CreateProyects({ onCreate }: IcreateProyect) {
  return (
    <section
      id="createProyect"
      className="flex flex-col justify-start items-center gap-4 mx-auto mt-[5%]"
    >
      <img src={logo} alt="logo" className="w-20 h-20 object-cover " />
      <h3 className="font-bold text-xl text-gray-600">No Proyect Selected</h3>
      <p className="font-light text-base text-gray-400 ">
        Select a Proyect o get start with a new one
      </p>
      <button
        onClick={onCreate}
        className="px-4 py-2 bg-gray-800 rounded-xl text-gray-400 hover:text-gray-50"
      >
        Create a new Proyect
      </button>
    </section>
  );
}
