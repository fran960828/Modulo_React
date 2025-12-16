import { useEffect, useRef, useState,useCallback } from "react";
import { ContainerImage } from "./containerImage/ContainerImage";
import { AVAILABLE_PLACES } from "./utils/data";
import { sortPlacesByDistance } from "./utils/loc";
import type{ Iplace } from "./core/core_modules";
import { Modal } from "./modal/Modal";
import { DeleteConfirmation } from "./modal/DeleteConfirmation";

const storedId = JSON.parse(localStorage.getItem('selectedPlaces') || '[]')
const storedPlaces: Iplace[] = storedId
  .map((id: string) =>
    AVAILABLE_PLACES.find((place: Iplace) => place.id === id)
  )
  .filter((place): place is Iplace => place !== undefined);


function App() {
  const selectFavouritePlace=useRef<string|null>(null)
  const [placesSorted,setPlacesSorted]=useState<Iplace[]>([])
  const [favouritePlaces,setFavouritePlaces]=useState<Iplace[]>(storedPlaces)
  const [modalIsOpen,setModalIsOpen]=useState(false)


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      const sortedPlaces = sortPlacesByDistance(AVAILABLE_PLACES, position.coords.latitude, position.coords.longitude);
      setPlacesSorted(sortedPlaces);
    });
  }, []);

  function handleFavouritePlaces(id:string){
    setFavouritePlaces((prevFavouriteplaces)=>{
      if (prevFavouriteplaces.some((place)=>place.id===id)){
        return prevFavouriteplaces
      }
      const place=AVAILABLE_PLACES.find((place)=>place.id===id)
      return place ? [place,...prevFavouriteplaces] : prevFavouriteplaces
    })
    const storedId = JSON.parse(localStorage.getItem('selectedPlaces') || '[]')
    localStorage.setItem('selectedPlaces', JSON.stringify([id,...storedId]))
  }

  function handleRemovePlaces(id: string) {
  setModalIsOpen(true)
  selectFavouritePlace.current = id
}
  function handleOnClose(){
    setModalIsOpen(false)
  }
 const handleRemoveFavorites = useCallback(() => {
  setFavouritePlaces((prevFavoritesplaces) =>
    prevFavoritesplaces.filter(
      (place: Iplace) => place.id !== selectFavouritePlace.current
    )
  )

  setModalIsOpen(false)

  const storedId = JSON.parse(localStorage.getItem('selectedPlaces') || '[]')
  localStorage.setItem(
    'selectedPlaces',
    JSON.stringify(
      storedId.filter((id: string) => id !== selectFavouritePlace.current)
    )
  )
}, [])

 

  return <>
  <Modal open={modalIsOpen} onClose={handleOnClose}>
      <DeleteConfirmation onConfirm={handleRemoveFavorites} onCancel={handleOnClose}/>

    </Modal>
  <div id="container" className="flex flex-col gap-6 px-[5%] py-[2%]">
    <ContainerImage title="I'd like to visit..." description="Select the places you would like to visit below." places={favouritePlaces} addRemovePlaces={handleRemovePlaces}/>
    <ContainerImage title="Availables Places" description="sorting places by distances..." places={placesSorted} addRemovePlaces={handleFavouritePlaces}/>

  </div>
  
  </>;
}

export default App;
