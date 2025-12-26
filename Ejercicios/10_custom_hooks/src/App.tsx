import { useRef, useState, useEffect } from "react";
import type { Iplace, Ierror } from "./core/entities";
import { fetchUserPlaces, updateUserPlaces } from "./data/api";
import { BackendImage } from "./presentation/containers/BackendImage";
import { FavouriteImage } from "./presentation/containers/FavouriteImage";
import Modal from "./presentation/components/Modal";
import DeleteConfirmation from "./presentation/components/DeleteConfirmation";
import ErrorDom from "./presentation/components/Error";

function App() {
  const [data, setData] = useState<Iplace[]>([]);
  const [errorUpdate, setErrorUpdate] = useState<Ierror | null>(null);
  const [modal, setModal] = useState<boolean>(false);
  const clickedPlace = useRef<Iplace | null>(null);

  useEffect(() => {
    fetchUserPlaces().then(setData);
  }, []);

  async function handleAddPlace(selectedPlace: Iplace) {
    const nextData = data.some((place) => place.id === selectedPlace.id)
      ? data
      : [selectedPlace, ...data];

    setData(nextData);

    try {
      await updateUserPlaces(nextData);
    } catch (error) {
      setData(data); // rollback
      if (error instanceof Error) {
        setErrorUpdate({ message: error.message });
      }
    }
  }

  function handleFavouritePlace(place: Iplace) {
    setModal(true);
    clickedPlace.current = place;
  }
  function handleCancelSelected() {
    setModal(false);
  }
  async function handleRemovePlace() {
    if (!clickedPlace.current) return;

    const nextData = data.filter(
      (place) => place.id !== clickedPlace.current!.id
    );

    setData(nextData);

    try {
      await updateUserPlaces(nextData);
    } catch (error) {
      setData(data); // rollback
      if (error instanceof Error) {
        setErrorUpdate({ message: error.message });
      }
    }

    setModal(false);
  }
  function handleErrorUpdated() {
    setModal(false);
    setErrorUpdate(null);
  }

  return (
    <>
      <Modal open={errorUpdate !== null} onClose={handleErrorUpdated}>
        <ErrorDom
          title="Failed Updated Database"
          message={errorUpdate?.message!}
        />
      </Modal>
      <Modal open={modal} onClose={handleCancelSelected}>
        <DeleteConfirmation
          onCancel={handleCancelSelected}
          onConfirm={handleRemovePlace}
        />
      </Modal>
      <main>
        <FavouriteImage onSelected={handleFavouritePlace} places={data} />
        <BackendImage onSelected={handleAddPlace} />
      </main>
    </>
  );
}

export default App;
