import { useState } from "react";
import { useRef } from "react";
export default function Player() {
  const [identify, setIdentify] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  function handleTitle() {
    setIdentify(inputRef.current?.value ?? null);
  }

  return (
    <div className="text-center">
      <h2 className="text-[#54a399] mb-4">
        Welcome {identify ?? "Unknown Entity"}
      </h2>
      <p className="flex justify-center items-stretch ">
        <input
          type="text"
          className=" bg-[#192f2b] border border-[#54a399] rounded-xs rounded-tr-0 rounded-br-0 p-1 text-[#d1f0ec]  "
          ref={inputRef}
        />
        <button
          className="cursor-pointer bg-[#54a399] border border-[#54a399] py-1 px-4 text-[#061e1a] rounded-tr-sm rounded-br-sm hover:bg-[#3c8379] hover:border-[#3c8379]"
          onClick={handleTitle}
        >
          Set Name
        </button>
      </p>
    </div>
  );
}
