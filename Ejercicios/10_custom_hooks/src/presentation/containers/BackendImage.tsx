import { sortedPlaces as fetchSortedPlaces } from "../../data/repository";
import { Places } from "../components/Places";
import { useFetch } from "../hooks/useFetch";
import ErrorDom from "../components/Error";
import type { Ibackend } from "../../core/entities";
export function BackendImage({ onSelected }: Ibackend) {
  const { isFetching, fetchedData, error } = useFetch({
    fnFetch: fetchSortedPlaces,
    initialValue: [],
  });

  if (error) {
    return <ErrorDom title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      messageLoading="Fetch data places..."
      messageFallback="Not available places"
      isLoading={isFetching}
      places={fetchedData}
      onSelect={onSelected}
    />
  );
}
