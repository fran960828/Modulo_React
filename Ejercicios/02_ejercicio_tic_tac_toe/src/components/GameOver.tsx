import type { Igameover } from "../modals/Modals"

export default function GameOver({winner,onRematch}:Igameover){
    return (
    <div id="game-over">
        <h2>GAME OVER !!!</h2>
        {winner && <p>El ganador es el jugador {winner}</p>}
        {!winner && <p>El resultado es empate</p>}
        <p>
            <button onClick={onRematch}>Rematch</button>
        </p>
    </div>
    )

}