interface UserInfoProp {
  nombre: string;
  apellidos: string;
}

export function UserInfo(prop: UserInfoProp) {
  return (
    <div>
      <h3>
        Mi nombre es {prop.nombre} {prop.apellidos}
      </h3>
    </div>
  );
}
