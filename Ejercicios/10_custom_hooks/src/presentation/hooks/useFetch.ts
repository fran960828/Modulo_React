import type { Ierror, Iplace, IuseFetch } from "../../core/entities";
import { useState, useEffect } from "react";

export function useFetch({ fnFetch, initialValue }: IuseFetch) {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [error, setError] = useState<Ierror | null>(null);
  const [fetchedData, setFetchedData] = useState<Iplace[]>(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fnFetch();
        console.log(data);
        setFetchedData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError({ message: error.message || "Failed to fetch data." });
        }
      }

      setIsFetching(false);
    }

    fetchData();
  }, []);

  return {
    isFetching,
    fetchedData,
    setFetchedData,
    error,
  };
}
