import type { Ibutton } from "../core_modules/core";

export function Button({ children }: Ibutton) {
  return (
    <button className="px-8 py-2 rounded-sm bg-[#edbf68] text-xl font-bold text-stone-700">
      {children}
    </button>
  );
}
