interface Ichildren {
  children: React.ReactNode;
}
export function TagChildren(prop: Ichildren) {
  return <section>{prop.children}</section>;
}
