import type { Iplace } from "../core/entities";
import { fetchPlaces } from "./api";
import { sortPlacesByDistance } from "../core/use-cases";

export async function sortedPlaces() {
  const places = await fetchPlaces();
  return new Promise<Iplace[]>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const sortedPlaces = sortPlacesByDistance(
          places,
          position.coords.latitude,
          position.coords.longitude
        );
        resolve(sortedPlaces);
      }
    );
  });
}
