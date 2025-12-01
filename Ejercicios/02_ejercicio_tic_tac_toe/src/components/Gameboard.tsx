import type { IboardProp } from "../modals/Modals";


export default function Gameboard({ board,onSelectTurns }: IboardProp) {
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>onSelectTurns(rowIndex,colIndex)}
                  disabled={playerSymbol!==null}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
