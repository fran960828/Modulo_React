import type { Icontainer } from "../core/core_modules";







export function ContainerImage({
  title,
  description,
  places,
  addRemovePlaces,
}: Icontainer) {
  let classNameImage =
    "grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-6 my-8 mx-auto p-0 list-none";
  if (places.length < 3) {
    classNameImage = "grid grid-cols-3 gap-6 my-8 mx-auto p-0 list-none";
  }

  return (
    <section className="w-[90%] mx-auto my-8 p-4 border-2 rounded-lg border-[#0d373e] ">
      <h2 className="text-2xl p-0 m-0 mb-8 text-[#8feeff] text-center font-[raleway] ">
        {title}
      </h2>
      {places.length === 0 && <p className="text-center">{description}</p>}
      {places.length > 0 && (
        <ul className={classNameImage}>
          {places.map((place) => (
            <li
              key={place.id}
              className="relative flex flex-col  bg-[#1f1c2c] shadow-[0_8px_16px_rgba(0_0_0_0.15)] place-item"
            >
              <button
                className="bg-transparent border-none p-0"
                onClick={() => addRemovePlaces(place.id)}
              >
                <img
                  src={`http://localhost:3000/${place.image.src}`}
                  alt={place.image.alt}
                  className="w-full h-full object-cover rounded-lg"
                />
                <h3 className="font-[raleway] font-normal text-sm absolute bottom-0 right-4 my-4 mx-auto bg-[#feee86] rounded-sm px-1 py-0.5 shadow-[0_1px_4px_rgba(0_0_0_0.4)] text-black">
                  {place.title}
                </h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
