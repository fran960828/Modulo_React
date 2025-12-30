import logo from "/logo.jpg";

export function Header() {
  return (
    <header className="flex justify-between items-center px-[10%] py-12">
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="logo"
          className="w-16 h-16 object-contain rounded-[50%] border-2 border-[#ffc404]"
        />
        <h1 className="font-bold text-[2rem] uppercase tracking-[0.2rem]">
          React Food
        </h1>
      </div>
      <div>
        <button className="font-normal text-xl border-none text-[#ffc404] bg-transparent">
          Cart(0)
        </button>
      </div>
    </header>
  );
}
