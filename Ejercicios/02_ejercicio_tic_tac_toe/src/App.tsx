import "./App.css";
import Players from "./components/Players";
import Gameboard from "./components/Gameboard";
import { useState } from "react";
import type { Iturns, Iplayer } from "./modals/Modals";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./assets/winning_combination";

const INIT_ARRAY:(string|null)[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const PLAYERS:Iplayer = {
  X: 'Player 1',
  O: 'Player 2'
};
function deriveGameBoard(gameTurns:Iturns[]){
  let gameboard=[...INIT_ARRAY.map((array)=>[...array])]
  for (const turn of gameTurns){
    const {square,player}=turn
    const {row,col}=square
    gameboard[row][col]=player

  }
  return gameboard
}
function deriveActivePlayer(gameTurns:Iturns[]) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}
function deriveWinner(gameboard:(string|null)[][],players:Iplayer){
  let winner:string|undefined;
  for (const combination of WINNING_COMBINATIONS){
    let firstSquareSymbol=gameboard[combination[0].row][combination[0].column]
    let secondSquareSymbol=gameboard[combination[1].row][combination[1].column]
    let thirdSquareSymbol=gameboard[combination[2].row][combination[2].column]
    
    
    if (firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
      winner=players[firstSquareSymbol as 'X'|'O']
      return winner
    }
  }
}



function App() {
  const [player,setPlayer]=useState(PLAYERS)
  const [turns, setTurns]=useState<(Iturns|never)[]>([])
  let activePlayer=deriveActivePlayer(turns)
  let gameboard=deriveGameBoard(turns)
  let winner=deriveWinner(gameboard,player)
  let hasDraw=(turns.length===9 && !winner)
  function handleturns(rowIndex:number,colIndex:number){
    setTurns((prevturns:Iturns[])=>{
      const currentPlayer=deriveActivePlayer(prevturns)

      const updatedTurn=[{square:{row:rowIndex,col:colIndex},player:currentPlayer},...prevturns]
      return updatedTurn

    })
  }
  function onSelectedRematch(){
    setTurns([])
  }
  function handleSelectedName(symbol:string,newName:string){
    setPlayer((prevPlayer)=>{
      return {...prevPlayer,[symbol]:newName}
    }
  )}

  return (
    <>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players initialName="Player 1" symbol="X" isActive={activePlayer==='X'} onSelectedName={handleSelectedName} />
          <Players initialName="Player 2" symbol="O" isActive={activePlayer==='O'} onSelectedName={handleSelectedName}/>
        </ol>
        {(winner||hasDraw) && <GameOver winner={winner} onRematch={onSelectedRematch}/>}
        <Gameboard board={gameboard} onSelectTurns={handleturns} />
      </div>
        <Log gameturns={turns}/>
    </>
  );
}

export default App;
