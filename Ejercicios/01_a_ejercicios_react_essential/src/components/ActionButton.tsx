interface IactionProp {
  label: string;
  onAction: () => void;
}

export function ActionButton(prop: IactionProp) {
  return (
    <div>
      <button onClick={prop.onAction}>{prop.label}</button>
    </div>
  );
}
