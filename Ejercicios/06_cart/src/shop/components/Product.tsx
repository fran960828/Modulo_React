import type { Iproduct } from "../../core_modules/core"
import { Button } from "../../components/Button"

export function Product({prop}:{prop:Iproduct}){
    return (
        <li key={prop.id} className="m-0 p-0">
                            <article className="flex flex-col h-full bg-[#5f4e33] shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-md">
                              <img
                                src={prop.image}
                                alt="imagen"
                                className="mb-2 rounded-md"
                              />
                              <div
                                id="product__button"
                                className="flex-1 p-1 flex flex-col justify-between"
                              >
                                <h3 className="font-bold text-xl text-[#fbd392] ">
                                  {prop.title}
                                </h3>
                                <p className="text-sm mb-2 text-[#fbd392]">
                                  ${prop.price}
                                </p>
                                <p className="mb-8 text-sm ">{prop.description}</p>
                                <Button>Add Cart</Button>
                              </div>
                            </article>
                          </li>
    )
}