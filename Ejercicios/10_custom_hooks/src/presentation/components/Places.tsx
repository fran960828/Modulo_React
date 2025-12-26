import type { IimageDom, Iplace } from "../../core/entities";

export function Places({
  title,
  messageLoading,
  messageFallback,
  isLoading,
  places,
  onSelect,
}: IimageDom) {
  return (
    <section className="places-category">
      <h2>{title}</h2>
      {isLoading && <p className="fallback-text">{messageLoading}</p>}
      {!isLoading && places.length === 0 && (
        <p className="fallback-text">{messageFallback}</p>
      )}
      {!isLoading && places.length > 0 && (
        <ul className="places">
          {places.map((place: Iplace) => {
            return (
              <li key={place.id} className="place-item">
                <button onClick={() => onSelect(place)}>
                  <img
                    src={`http://localhost:3000/${place.image.src}`}
                    alt={place.image.alt}
                  />
                  <h3>{place.title}</h3>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
