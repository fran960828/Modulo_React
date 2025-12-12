import type { IcartItem } from "../../core_modules/core";
import CartContext from "../../store/shopCartContext";
import { useContext } from "react";


export function CartList(){
const {shoppingCart,handleUpdateProduct}=useContext(CartContext)!


return (
    <ul className="my-4 flex flex-col gap-2 p-0 list-none">
        {shoppingCart.map((product:IcartItem)=>(
            <li key={product.id} className="px-4 py-2 rounded-md bg-[#fbd392] text-[15px] flex justify-between items-center ">
                <span>{product.title}</span>
                <span className="font-bold">${product.price.toFixed(2)}</span>
                <div className="flex items-center gap-2 text-[1rem]">

                    <button onClick={()=>handleUpdateProduct(product.id,-1)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={()=>handleUpdateProduct(product.id,1)}>+</button>
                </div>
            </li>
        ))}
    </ul>
)
}