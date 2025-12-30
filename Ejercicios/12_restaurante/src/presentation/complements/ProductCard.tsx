import type { AvailableMeals, CardProduct } from "../../core/domain/models";
import { ErrorConnection } from "./ErrorConnection";

export function ProductCard({ data, errorLoad, isLoading }: CardProduct) {
  if (errorLoad){
    return <ErrorConnection/>
  }
  if (isLoading){
    return <p>Cargando datos ...</p>
  }


  return (
    <ul className="w-9/10 max-w-280 list-none mx-auto my-8 p-4 grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4  ">
      {data.map((product: AvailableMeals) => {
        return (
          <li key={product.id} className="bg-[#1d1a16] rounded-2xl text-center overflow-hidden shadow-[0_1px_6px_rgba(0_0_0_0.5)]">
            <article className="h-full flex flex-col justify-between ">
              <img
                src={`http://localhost:3000/${product.image}`}
                alt={product.name}
                className="w-full h-80 object-cover"
              />
              <h3 className="text-2xl my-3 font-bold">{product.name}</h3>
              <p className="w-fit bg-[#312c1d] text-[#ffc404] text-sm font-bold px-8 py-2 mx-auto mb-2 rounded-sm">${product.price}</p>
              <p className="m-4">{product.description}</p>
              <button className="w-fit mx-auto mb-4 bg-[#ffc404] border border-[#ffc404] rounded-sm text-[#1f1a09] py-2 px-6 hover:bg-[#1f1a09] hover:text-[#ffc404]">Add Cart</button>
            </article>
          </li>
        );
      })}
    </ul>
  );
}
