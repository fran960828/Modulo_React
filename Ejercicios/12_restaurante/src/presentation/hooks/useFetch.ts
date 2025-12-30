import { useState, useEffect } from "react";
import { type ErrorLoad, type UseFetch } from "../../core/domain/models";

export function useFetch<T>({ fnFetch, initialValue }: UseFetch<T>) {
  const [errorLoad, setErrorLoad] = useState<ErrorLoad | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>(initialValue);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setIsLoading(true);
      setErrorLoad(null);

      try {
        const result = await fnFetch();
        if (isMounted) {
          setData(result);
        }
      } catch (error) {
        if (isMounted && error instanceof Error) {
          setErrorLoad({
            message: error.message || "Failed to fetch data.",
          });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fnFetch]);

  return {
    data,
    isLoading,
    errorLoad,
  };
}
