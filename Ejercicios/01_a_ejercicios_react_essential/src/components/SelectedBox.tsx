import "./SelectedBox.css";
interface Iclass {
  clase: string;
  changeBorder: () => void;
}

export function SelectedBox(prop: Iclass) {
  return <div className={prop.clase} onClick={prop.changeBorder}></div>;
}
