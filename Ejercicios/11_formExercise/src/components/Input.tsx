import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: boolean;
}

export function Input({ id, label, error, ...props }: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm mb-1 text-[#9bafaf] uppercase font-bold"
      >
        {label}
      </label>

      <input
        {...props}
        id={id}
        className="block w-full max-w-60 p-2 text-lg rounded-sm bg-[#869999] border border-[#869999] text-[#142020]"
      />

      <div className="text-[#ffca99] text-sm h-8 py-2">
        {error && <p className="m-0">Introduce un valor correcto</p>}
      </div>
    </div>
  );
}
