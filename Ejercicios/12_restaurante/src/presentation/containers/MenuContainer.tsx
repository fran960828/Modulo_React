import { getMenuRestaurant } from "../../config/dependencies";
import { ProductCard } from "../complements/ProductCard";
import { useFetch } from "../hooks/useFetch";

export function MenuContainer() {
  const { data, isLoading, errorLoad } = useFetch({
    fnFetch: getMenuRestaurant,
    initialValue: [],
  });

  return (
    <section>
      <ProductCard data={data} isLoading={isLoading} errorLoad={errorLoad} />
    </section>
  );
}
