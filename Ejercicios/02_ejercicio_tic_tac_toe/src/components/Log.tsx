import type { Ilog } from "../modals/Modals";


export default function Log({gameturns}:Ilog){
return (
    <ol id="log">
        {gameturns.map((turn)=>(
            <li key={`${turn.square.row}${turn.square.col}`}>
                {`${turn.player} en posicion ${turn.square.row}, ${turn.square.col} `}
            </li>
        ))}
    </ol>
)
}