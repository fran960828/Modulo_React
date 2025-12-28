import { Header } from "./components/Header";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";

function App() {
  return (
    <>
      <Header />
      <main className="mx-auto">
        <Signup />
      </main>
    </>
  );
}

export default App;
