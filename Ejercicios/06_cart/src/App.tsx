import { Header } from "./header/Header";
import { Shop } from "./shop/Shop";
import { ShopCartContextProvider } from "./store/shopCartContext";

function App() {
  return (
    <>
      <ShopCartContextProvider>
        <div id="container" className="my-[3%] mx-[15%] px-4 py-2">
          <Header />
          <Shop />
        </div>
      </ShopCartContextProvider>
    </>
  );
}

export default App;
