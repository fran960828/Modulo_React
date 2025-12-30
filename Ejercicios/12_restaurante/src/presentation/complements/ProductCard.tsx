import type { AvailableMeals, CardProduct } from "../../core/domain/models";

export function ProductCard({ data, errorLoad, isLoading }: CardProduct) {
  return (
    <ul>
      {data.map((product: AvailableMeals) => {
        return (
          <li key={product.id}>
            <img
              src={`http://localhost:3000/image/${product.image}`}
              alt={product.name}
            />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>{product.description}</p>
            <button>Add Cart</button>
          </li>
        );
      })}
    </ul>
  );
}
