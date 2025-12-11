import { createContext,useState } from "react";
import { type Iproduct, type IcontextCart,type IfunctionContext} from "../core_modules/core";

const CartContext=createContext<IcontextCart|undefined>(undefined)

export function CartContextProvider({children}:IfunctionContext){
    const [shoppingCart,setShoppingCart]=useState<Iproduct|undefined>()








    return (
        <CartContext.Provider value={}>{children}</CartContext.Provider>
    )



}
