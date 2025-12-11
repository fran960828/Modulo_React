import { useRef, useState, useEffect } from "react";
import type { JSX } from "react/jsx-runtime";
import { ModalLayer } from "./ModalLayer";
import type { ModalHandle } from "./ModalLayer";

interface ItimeManagerProp {
  label: string;
  targetTime: number;
}

export function TimeManager({
  label,
  targetTime,
}: ItimeManagerProp): JSX.Element {
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const timer = useRef<number | null>(null);
  const dialog = useRef<ModalHandle | null>(null);

  const timerIsActive = timer.current !== null;

  function handleStart() {
    if (timer.current !== null) return;

    timer.current = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 10) {
          clearInterval(timer.current!);
          timer.current = null;
          dialog.current?.open();
          return 0;
        }
        return prev - 10;
      });
    }, 10);
  }

  function handleStop() {
    if (timer.current !== null) {
      clearInterval(timer.current);
      timer.current = null;
      dialog.current?.open();
    }
  }

  function handleReset() {
    handleStop();
    setTimeRemaining(targetTime * 1000);
  }

  // ✅ Limpieza PROFESIONAL al desmontar
  useEffect(() => {
    return () => handleStop();
  }, []);

  return (
    <>
      <ModalLayer
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />

      <article
        className="max-w-88 flex flex-col items-center justify-center p-8 my-8 mx-auto 
        bg-[linear-gradient(#4df8df,#4df0f8)]
        text-[#221c18] shadow-[0_2px_8px_rgba(35,34,34,0.6)] rounded-md gap-2"
      >
        <h2 className="font-extrabold m-0 text-center uppercase">{label}</h2>

        <p className="border border-[#46cebe] rounded-sm py-1 px-2 m-2">
          {targetTime} second{targetTime === 1 ? "" : "s"}
        </p>

        <button
          className="mt-4 py-2 px-4 border-0 rounded-sm bg-[#12352f] text-[#edfcfa] 
          text-[1.2rem] cursor-pointer hover:bg-[#051715] transition-colors duration-200"
          onClick={timerIsActive ? handleStop : handleStart}
        >
          {timerIsActive ? "Stop Timer Challenge" : "Start Timer Challenge"}
        </button>

        <p className="text-sm mt-2">
          {timerIsActive ? "Timer is running" : "Timer inactive"}
        </p>
      </article>
    </>
  );
}
