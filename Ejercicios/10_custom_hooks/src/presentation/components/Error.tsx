import type { IerrorDom } from "../../core/entities";

export default function ErrorDom({ title, message }: IerrorDom) {
  return (
    <div className="error rounded-xl">
      <h2 className="text-3xl text-center font-bold mb-8 uppercase">{title}</h2>
      <p className="text-lg text-center ">{message}</p>
    </div>
  );
}
