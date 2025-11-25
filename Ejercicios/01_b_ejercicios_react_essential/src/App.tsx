import { useState } from "react";
import Modal from "./modal/Modal";
import { ProductList } from "./producto/ProductoList";
import "./App.css";

function App() {
  const [open, setOpen] = useState(false);
  function handleModal() {
    setOpen(!open);
  }
  return (
    <>
      <Modal isOpen={open} onClose={handleModal} />
      <section className="productos">
        <ProductList />
      </section>
    </>
  );
}

export default App;
