import { Header } from "./presentation/complements/Header";
import { MenuContainer } from "./presentation/containers/MenuContainer";
import { ContextGlobalProvider } from "./presentation/store/ContextGlobal";
import { ContextRestProvider } from "./presentation/store/ContextRest";

function App() {
  return (
    <ContextGlobalProvider>
      <ContextRestProvider>
        <Header />
        <main>
          <MenuContainer />
        </main>
      </ContextRestProvider>
    </ContextGlobalProvider>
  );
}

export default App;
