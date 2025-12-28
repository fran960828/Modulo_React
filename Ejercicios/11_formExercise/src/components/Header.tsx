import logo from "../assets/logo.jpg";

export function Header() {
  return (
    <header className="my-8 flex flex-col items-center justify-center gap-8">
      <img
        src={logo}
        alt="logo"
        className="w-18 h-18 rounded-[50%] object-cover border-2 border-[#758a8a] drop-shadow-[0_0_4px_rgba(31,42,42,0.5)]"
      />
      <h1 className="font-bold text-4xl text-[#2f4444] capitalize tracking-[0.2rem]">
        React Forms
      </h1>
    </header>
  );
}
