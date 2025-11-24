interface IcontadorProp {
  label: number;
  incrementador: () => void;
}

export function Contador(prop: IcontadorProp) {
  return <button onClick={prop.incrementador}>{prop.label}</button>;
}
