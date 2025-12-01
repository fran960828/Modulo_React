import "./App.css";
import Players from "./components/Players";
import Gameboard from "./components/Gameboard";

const INIT_ARRAY = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  return (
    <>
      <div id="game-container">
        <ol id="players" className="hightlight-player">
          <Players initialName="Player 1" symbol="X" />
          <Players initialName="Player 2" symbol="0" />
        </ol>

        <Gameboard board={INIT_ARRAY} />
      </div>
    </>
  );
}

export default App;
