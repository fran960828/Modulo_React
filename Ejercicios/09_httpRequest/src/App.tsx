import { useEffect, useRef, useState, useCallback } from "react";
import { ContainerImage } from "./containerImage/ContainerImage";
import { ContainerImageFavourite } from "./containerImage/ContainerImageFavourite";
import { sortPlacesByDistance } from "./utils/loc";
import type { Iplace } from "./core/core_modules";
import { Modal } from "./modal/Modal";
import { DeleteConfirmation } from "./modal/DeleteConfirmation";
import {
  fetchAvailablePlaces,
  fetchUserPlaces,
  updateUserPlaces,
} from "./httpRequest/httpRequest";
import { ErrorRequest } from "./components/ErrorRequest";
interface IerrorMessage {
  message: string;
}

function App() {
  const selectFavouritePlace = useRef<string | null>(null);
  const [placesSorted, setPlacesSorted] = useState<Iplace[]>([]);
  const [favouritePlaces, setFavouritePlaces] = useState<Iplace[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorHttp, setErrorHttp] = useState<IerrorMessage>();
  const [errorSent, setErrorSent] = useState<IerrorMessage | null>(null);

  useEffect(() => {
    async function handlePlacesBackend() {
      try {
        const availablePlaces = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const sortedPlaces = sortPlacesByDistance(
              availablePlaces,
              position.coords.latitude,
              position.coords.longitude
            );
            setPlacesSorted(sortedPlaces);
          }
        );
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "conexion fallida";
        setErrorHttp({ message: errorMessage });
      }
    }
    handlePlacesBackend();
  }, []);
  useEffect(() => {
    async function handlePlacesUser() {
      try {
        const userPlaces = await fetchUserPlaces();
        setFavouritePlaces(userPlaces);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "conexion fallida";
        setErrorHttp({ message: errorMessage });
      }
    }
    handlePlacesUser();
  }, []);

  async function handleFavouritePlaces(id: string) {
    const availablePlaces = await fetchAvailablePlaces();
    setFavouritePlaces((prevFavouriteplaces) => {
      if (prevFavouriteplaces.some((place) => place.id === id)) {
        return prevFavouriteplaces;
      }
      const place = availablePlaces.find((place) => place.id === id);
      return place ? [place, ...prevFavouriteplaces] : prevFavouriteplaces;
    });
    try {
      const place = availablePlaces.find((place) => place.id === id);
      if (place) {
        await updateUserPlaces([place, ...favouritePlaces]);
      }
    } catch (error: unknown) {
      setFavouritePlaces(favouritePlaces);
      const errorMessage =
        error instanceof Error ? error.message : "Error al guardar el dato";
      setErrorSent({ message: errorMessage });
    }
  }

  function handleRemovePlaces(id: string) {
    setModalIsOpen(true);
    selectFavouritePlace.current = id;
  }
  function handleOnClose() {
    setModalIsOpen(false);
  }
  const handleRemoveFavorites = useCallback(async () => {
    setFavouritePlaces((prevFavoritesplaces) =>
      prevFavoritesplaces.filter(
        (place: Iplace) => place.id !== selectFavouritePlace.current
      )
    );
    try {
      await updateUserPlaces(
        favouritePlaces.filter(
          (place: Iplace) => place.id !== selectFavouritePlace.current
        )
      );
    } catch (error) {
      setFavouritePlaces(favouritePlaces);
      const errorMessage =
        error instanceof Error ? error.message : "Error al eliminar el dato";
      setErrorSent({ message: errorMessage });
    }

    setModalIsOpen(false);
  }, [favouritePlaces]);
  function handleError() {
    setErrorSent(null);
  }

  return (
    <>
      <Modal open={errorSent !== null} onClose={handleError}>
        <ErrorRequest
          title="Error de Envio"
          message={errorSent?.message || ""}
          onConfirm={handleError}
        />
      </Modal>

      <Modal open={modalIsOpen} onClose={handleOnClose}>
        <DeleteConfirmation
          onConfirm={handleRemoveFavorites}
          onCancel={handleOnClose}
        />
      </Modal>
      <div id="container" className="flex flex-col gap-6 px-[5%] py-[2%]">
        <ContainerImageFavourite
          title="I'd like to visit..."
          description="Select the places you would like to visit below."
          places={favouritePlaces}
          addRemovePlaces={handleRemovePlaces}
        />

        {!errorHttp ? (
          <ContainerImage
            title="Availables Places"
            description="sorting places by distances..."
            places={placesSorted}
            addRemovePlaces={handleFavouritePlaces}
          />
        ) : (
          <ErrorRequest title="An error Ocurred" message={errorHttp.message} />
        )}
      </div>
    </>
  );
}

export default App;
