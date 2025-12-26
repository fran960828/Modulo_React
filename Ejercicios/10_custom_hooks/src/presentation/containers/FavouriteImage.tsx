import type { IFavourite } from "../../core/entities";
import { fetchUserPlaces } from "../../data/api";
import ErrorDom from "../components/Error";
import { Places } from "../components/Places";
import { useFetch } from "../hooks/useFetch";

export function FavouriteImage({ onSelected, places }: IFavourite) {
  const { isFetching, error } = useFetch({
    fnFetch: fetchUserPlaces,
    initialValue: [],
  });

  if (error) {
    return <ErrorDom title="An error Ocurred" message={error.message} />;
  }

  return (
    <Places
      title="Favourite Places"
      messageLoading="Fetching your places..."
      messageFallback="Select the places you would like to visit below"
      isLoading={isFetching}
      places={places}
      onSelect={onSelected}
    />
  );
}
