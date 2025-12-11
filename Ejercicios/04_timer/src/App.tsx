import Player from "./components/Player";
import { TimeManager } from "./components/TimeManager";

function App() {
  return (
    <>
      <Player />
      <section className="max-w-200 my-12 mx-auto flex flex-wrap gap-8">
        <TimeManager label="Easy" targetTime={1} />
        <TimeManager label="Medium" targetTime={5} />
        <TimeManager label="Hard" targetTime={10} />
        <TimeManager label="Alien" targetTime={15} />
      </section>
    </>
  );
}

export default App;
