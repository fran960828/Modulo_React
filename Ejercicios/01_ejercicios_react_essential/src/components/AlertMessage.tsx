import "./AlertMessage.css";
interface MessageProp {
  message: string;
  resultado: "success" | "failed";
}
export function AlertMessage(prop: MessageProp) {
  return (
    <div>
      <h4 className={prop.resultado}>contenido del mensaje:{prop.message}</h4>
    </div>
  );
}
