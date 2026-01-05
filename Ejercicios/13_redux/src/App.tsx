import { useEffect } from "react";
import { Header } from "./presentation/complements/Header";
import { MenuContainer } from "./presentation/containers/MenuContainer";
import {
  useAppDispatch,
  useAppSelector,
} from "./presentation/hooks/customHooks";
import { syncCartWithFirebase } from "./presentation/store/thunk_update";
import Notification from "./presentation/complements/Notification";
import { getCartFromFirebase } from "./presentation/store/thunk_get";

let isInitial = true;

function App() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const notification = useAppSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(getCartFromFirebase());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    // Solo disparamos si hubo un cambio local (addProduct/removeProduct)
    if (cart.change) {
      const dataToSent = {
        cart: {
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        },
      };

      dispatch(syncCartWithFirebase(dataToSent));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
      <Header />
      <main>
        <MenuContainer />
      </main>
    </>
  );
}

export default App;
