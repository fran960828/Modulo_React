import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

interface IModalProps {
  targetTime: number;
  remainingTime: number;
  onReset: () => void;
}
export interface ModalHandle {
  open: () => void;
}

// ✅ Usamos HTMLDialogElement porque es un modal real
export const ModalLayer = forwardRef<ModalHandle, IModalProps>(
  ({ targetTime, remainingTime, onReset }, ref) => {
    const dialog = useRef<HTMLDialogElement | null>(null);
    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current?.showModal();
        },
      };
    });

    return createPortal(
      <dialog
        ref={dialog}
        className="border-0 rounded-lg p-8 bg-[#d7fcf8] mx-auto my-auto result-modal"
      >
        {userLost && <h2 className="font-[3rem] uppercase mb-1">You lost</h2>}
        {!userLost && (
          <h2 className="font-[3rem] uppercase mb-1">Your Score: {score}</h2>
        )}
        <p className="my-2 font-[1.2rem] ">
          The target time was{" "}
          <strong className="text-[#10655b]">{targetTime} seconds.</strong>
        </p>
        <p>
          You stopped the timer with{" "}
          <strong>{formattedRemainingTime} seconds left.</strong>
        </p>
        <form method="dialog" onSubmit={onReset} className="text-right">
          <button className="mt-4 py-2 px-4 border-none rounded-s-sm bg-[#12352f] text-[#edfcfa] text-[1.2rem] cursor-pointer hover:bg-[#051715]">
            Close
          </button>
        </form>
      </dialog>,
      document.getElementById("modal")!
    );
  }
);
