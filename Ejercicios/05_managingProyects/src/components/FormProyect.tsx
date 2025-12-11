import { useRef } from "react";
import type { IformProyectProp } from "../modal/modal";

export function FormProyect({ onSave, onCancel }: IformProyectProp) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const title = titleRef.current!.value;
    const description = descriptionRef.current!.value;
    const date = dateRef.current!.value;

    onSave({
      id: crypto.randomUUID(),
      title,
      description,
      date,
    });

    // ✅ Limpiar inputs
    titleRef.current!.value = "";
    descriptionRef.current!.value = "";
    dateRef.current!.value = "";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-[5%] ml-[2%] flex flex-col justify-start items-start gap-8 w-[30%]"
    >
      <menu
        id="buttons"
        className="flex flex-row justify-end-safe items-center gap-4 w-full"
      >
        <button
          type="button"
          onClick={onCancel}
          className="text-stone-600 hover:text-stone-950 text-sm text-bold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-stone-600 text-stone-50 rounded-xl py-2 px-6 hover:bg-stone-950 "
        >
          Save
        </button>
      </menu>
      <p className="flex flex-col gap-2 items-start w-full">
        <label
          htmlFor="title"
          className="font-bold text-sm uppercase text-stone-500"
        >
          Title
        </label>
        <input
          ref={titleRef}
          type="text"
          id="title"
          className="bg-stone-200 border-stone-300 rounded-sm text-stone-600 w-full p-1 border-b-2 focus:outline-none focus:border-b-stone-800"
          required
        />
      </p>
      <p className="flex flex-col gap-2 items-start w-full">
        <label
          htmlFor="description"
          className="font-bold text-sm uppercase text-stone-500"
        >
          Description
        </label>
        <textarea
          ref={descriptionRef}
          name="description"
          id="description"
          className="bg-stone-200 border-stone-300 rounded-sm text-stone-600 w-full p-1 border-b-2 focus:outline-none focus:border-b-stone-800"
          required
        ></textarea>
      </p>
      <p className="flex flex-col gap-2 items-start w-full">
        <label
          htmlFor="date"
          className="font-bold text-sm uppercase text-stone-500"
        >
          duetoDate
        </label>
        <input
          ref={dateRef}
          type="date"
          id="date"
          className="bg-stone-200 border-stone-300 rounded-sm text-stone-600 w-full p-1 border-b-2 focus:outline-none focus:border-b-stone-800"
          required
        />
      </p>
    </form>
  );
}
