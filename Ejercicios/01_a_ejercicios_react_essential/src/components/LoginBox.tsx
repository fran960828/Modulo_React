interface IloginProp {
  children: React.ReactNode;
  showHide: () => void;
}

export function LoginBox(prop: IloginProp) {
  return <button onClick={prop.showHide}>{prop.children}</button>;
}

export function LoginForm() {
  return (
    <form action="">
      <div>
        <label htmlFor="user">Usuario</label>
        <input type="text" id="user" />
      </div>
      <div>
        <label htmlFor="password">Contraseña</label>
        <input type="text" id="password" />
      </div>
      <div>
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
}
