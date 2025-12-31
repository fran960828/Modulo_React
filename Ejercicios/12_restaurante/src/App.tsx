import { Header } from "./presentation/complements/Header";
import { MenuContainer } from "./presentation/containers/MenuContainer";
import { ContextRestProvider } from "./presentation/store/ContextRest";

function App() {
  return (
    <ContextRestProvider>
      <Header />
      <main>
        <MenuContainer />
      </main>
    </ContextRestProvider>
  );
}

export default App;
