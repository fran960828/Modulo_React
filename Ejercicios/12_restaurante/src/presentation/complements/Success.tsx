import { useContext } from "react";
import { contextGlobal } from "../store/ContextGlobal";

export function Success() {
  const { closeAll } = useContext(contextGlobal);

  function handleConfirm() {
    closeAll();
  }

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[#1d4949] rounded-sm shadow-2xl animate-in fade-in zoom-in duration-300">
      {/* Icono de Éxito */}
      <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-[#147b73] text-[#d9e2f1]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </div>

      <h2 className="text-3xl font-bold text-white mb-2">¡Pedido Recibido!</h2>

      <p className="text-[#9bafaf] text-lg max-w-xs mb-8">
        Tu comida está en camino. Hemos enviado los detalles a tu correo
        electrónico.
      </p>

      <button
        onClick={handleConfirm}
        className="w-full py-3 px-6 bg-[#147b73] hover:bg-[#1a948a] text-white font-bold rounded-sm transition-colors uppercase tracking-wider"
      >
        Aceptar y volver
      </button>
    </div>
  );
}
