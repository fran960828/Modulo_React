import type { Iplace } from "../core/core_modules";

export async function fetchAvailablePlaces(): Promise<Iplace[]> {
  const response = await fetch("http://localhost:3000/places");
  if (!response.ok) {
    throw new Error("failed connection");
  }
  const respJson = await response.json();
  return respJson.places;
}

export async function fetchUserPlaces(): Promise<Iplace[]> {
  const response = await fetch("http://localhost:3000/user-places");
  if (!response.ok) {
    throw new Error("failed connection");
  }
  const respJson = await response.json();
  return respJson.places;
}

export async function updateUserPlaces(places: Iplace[]) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({ places }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to update user data.");
  }

  return resData.message;
}
