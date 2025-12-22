import type { Iplace } from "../core/core_modules";

export async function fetchAvailablePlaces(): Promise<Iplace[]> {
  const response = await fetch("http://localhost:3000/places");
  if (!response.ok) {
    throw new Error("failed connection");
  }
  const respJson = await response.json();
  return respJson.places;
}
