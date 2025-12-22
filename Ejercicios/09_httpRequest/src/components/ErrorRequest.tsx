import type { Ierror } from "../core/core_modules"
export function ErrorRequest({title,message,onConfirm}:Ierror){

    return(
        <div id="error__request" className="bg-amber-500 mx-auto my-auto px-8 py-4 flex flex-col items-center rouded-lg shadow-amber-500">
            <h2 className="text-bold text-3xl text-white text-center">{title}</h2>
            <p className="text-normal text-xl text-white text-center">{message}</p>
            {onConfirm &&
                <div>
                    <button onClick={onConfirm}>Cerrar</button>
                </div>
            }
        </div>
    )
}