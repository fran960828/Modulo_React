import { Button } from "./components/Button";
import type { Iproduct } from "./core_modules/core";
import { Header } from "./header/Header";
import { DUMMY_PRODUCTS } from "./utils/dummy-products";

function App() {
  return (
    <>
      <div id="container" className="my-[3%] mx-[15%] px-4 py-2">
        <Header />
        <main>
          <h2>ELEGANT CLOTHING FOR EVERYONE</h2>
          <section className="flex flex-row flex-wrap gap-8 ">
            {DUMMY_PRODUCTS.map((product: Iproduct) => (
              <li>
                <article
                  key={product.id}
                  className="flex flex-col gap-1 w-1/4 bg-[#5f4e33]"
                >
                  <img src={product.image} alt="imagen" />
                  <div id="product__button">
                    <h3>{product.title}</h3>
                    <p>${product.price}</p>
                    <p>{product.description}</p>
                    <Button>Add Cart</Button>
                  </div>
                </article>
              </li>
            ))}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
