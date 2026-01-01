import { createContext, useCallback, useState, type ReactNode } from "react";
import type { IContextGlobal, UIStatus } from "../../core/domain/models";

export const contextGlobal = createContext<IContextGlobal>(
  {} as IContextGlobal
);

export function ContextGlobalProvider({ children }: { children: ReactNode }) {
  const [stateUI, setStateUI] = useState<UIStatus>("IDLE");

  const handleUICart = () => setStateUI("CART");
  const handleUIForm = () => setStateUI("FORM");

  const handleUISuccess = useCallback(() => {
    setStateUI("SUCCESS");
  }, []);

  const closeAll = useCallback(() => setStateUI("IDLE"), []);

  return (
    <contextGlobal.Provider
      value={{
        stateUI,
        handleUICart,
        handleUIForm,
        handleUISuccess,
        closeAll,
      }}
    >
      {children}
    </contextGlobal.Provider>
  );
}
