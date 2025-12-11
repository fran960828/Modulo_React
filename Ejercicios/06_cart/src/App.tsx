import { Button } from "./components/Button";
import type { Iproduct } from "./core_modules/core";
import { Header } from "./header/Header";
import { DUMMY_PRODUCTS } from "./utils/dummy-products";

function App() {
  return (
    <>
      <div id="container" className="my-[3%] mx-[15%] px-4 py-2">
        <Header />
        <section>
          <h2 className="text-2xl text-stone-400 uppercase font-bold mb-4">
            ELEGANT CLOTHING FOR EVERYONE
          </h2>
          <ul className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-8 list-none">
            {DUMMY_PRODUCTS.map((product: Iproduct) => (
              <li key={product.id} className="m-0 p-0">
                <article className="flex flex-col h-full bg-[#5f4e33] shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-md">
                  <img
                    src={product.image}
                    alt="imagen"
                    className="mb-2 rounded-md"
                  />
                  <div
                    id="product__button"
                    className="flex-1 p-1 flex flex-col justify-between"
                  >
                    <h3 className="font-bold text-xl text-[#fbd392] ">
                      {product.title}
                    </h3>
                    <p className="text-sm mb-2 text-[#fbd392]">
                      ${product.price}
                    </p>
                    <p className="mb-8 text-sm ">{product.description}</p>
                    <Button>Add Cart</Button>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

export default App;
