import { useState } from "react";
import "./producto.css";
interface Iproducto {
  id: number;
  name: string;
  price: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function Product(prop: Iproducto) {
  return (
    <article className={prop.isSelected ? "producto__active" : undefined}>
      <h3 className="producto__title">{prop.name}</h3>
      <p className="producto__price">Precio: {prop.price}€</p>
      <button className="producto__selected" onClick={prop.onSelect}>
        Seleccionar
      </button>
    </article>
  );
}
export function ProductList() {
  const [selected, setSelected] = useState("");
  function handleVisualProduct(producto: string) {
    setSelected(producto);
  }

  return (
    <>
      <Product
        id={1}
        name="ordenador"
        price={800}
        isSelected={selected === "ordenador"}
        onSelect={() => handleVisualProduct("ordenador")}
      />
      <Product
        id={2}
        name="iphone"
        price={1200}
        isSelected={selected === "iphone"}
        onSelect={() => handleVisualProduct("iphone")}
      />
      <Product
        id={3}
        name="tablet"
        price={500}
        isSelected={selected === "tablet"}
        onSelect={() => handleVisualProduct("tablet")}
      />
      <Product
        id={4}
        name="airpods"
        price={300}
        isSelected={selected === "airpods"}
        onSelect={() => handleVisualProduct("airpods")}
      />
    </>
  );
}
