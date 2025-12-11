import logo from "/logo.png";
import { Button } from "../components/Button";

export function Header() {
  return (
    <header className="flex flex-row justify-between items-center mb-8">
      <div
        id="title"
        className="flex flex-row justify-start items-center gap-4"
      >
        <img src={logo} alt="logo" className="w-1/8 h-1/8 object-cover" />
        <h1 className="font-extrabold text-4xl text-[#edbf68] m-0">
          ELEGANT CONTEXT
        </h1>
      </div>
      <div id="title__button">
        <Button>Cart(0)</Button>
      </div>
    </header>
  );
}
