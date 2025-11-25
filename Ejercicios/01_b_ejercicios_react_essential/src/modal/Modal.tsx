import "./Modal.css";
interface ImodalProp {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

function fondoSemiTransparente() {
  return (
    <div id="comentarios">
      <h2>Titulo del ejercicio 14</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente
        eveniet, molestias fugit nam praesentium numquam ex nostrum voluptates
        soluta? Dolores velit modi nesciunt vel cumque quaerat, quos pariatur
        laborum consequuntur.
      </p>
    </div>
  );
}
export default function Modal(prop: ImodalProp) {
  return (
    <div>
      {prop.isOpen && fondoSemiTransparente()}
      <button onClick={prop.onClose}>Cerrar</button>
    </div>
  );
}
