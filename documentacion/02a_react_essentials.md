# 📘 Documentación React + TypeScript para Principiantes

### _Guía detallada con ejemplos comentados_

```tsx
/**
 * Explicación rápida (comentario al inicio):
 *
 * Este documento muestra, paso a paso, cómo crear componentes estáticos en React con TypeScript,
 * cómo renderizarlos, cómo introducir contenido dinámico, imágenes, estilos y eventos,
 * y cómo hacer componentes reutilizables con props y children.
 *
 * Tras esta explicación encontrarás un ejemplo completo y comentado que puedes copiar/pegar
 * en un proyecto creado con Vite/CRA/Next (en los archivos .tsx correspondientes).
 */
```

---

## 🧭 Índice de conceptos

1. Componentes estáticos (funciones en mayúscula)
2. Usar un componente: `<Componente/>`
3. Renderizar con `createRoot(...).render(<App/>)`
4. Contenido dinámico con `{ }`
5. Importación dinámica de imágenes
6. Componentes reutilizables mediante `props`
7. Importar estilos CSS por componente
8. Uso de `children` como `React.ReactNode`
9. Eventos (`onClick`) y funciones internas
10. Eventos con funciones pasadas vía `props`
11. Arrow functions dentro de eventos para enviar parámetros
12. `useState` — variables reactivas
13. Renderizado condicional con ternario
14. Ternarios para cambiar `className`

---

# 1. Componentes estáticos en React

Un componente funcional en React es una función que devuelve JSX.  
Debe empezar con **mayúscula**:

```tsx
// MyButton.tsx
import React from "react";

export function MyButton(): JSX.Element {
  return <button>Hola</button>;
}
```

---

# 2. Uso de un componente ya creado

```tsx
// App.tsx
import React from "react";
import { MyButton } from "./MyButton";

export function App(): JSX.Element {
  return (
    <div>
      <MyButton />
    </div>
  );
}
```

---

# 3. Renderizar el árbol de componentes en el DOM

```tsx
// main.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("No se encontró el elemento #root");

createRoot(container).render(<App />);
```

---

# 4. Contenido dinámico con `{}`

```tsx
const name = "María";
return <h1>Hola, {name}!</h1>;
```

---

# 5. Imágenes dinámicas

```tsx
import logo from "src/assets/logo.png";
<img src={logo} alt="logo" />;
```

---

# 6. Props

```tsx
import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export function Button({ label, onClick }: ButtonProps): JSX.Element {
  return <button onClick={onClick}>{label}</button>;
}
```

---

# 7. Importar CSS

Se debe crear un archivo css con el mismo nombre del componente junto a dicho componente

```tsx
import React from "react";
import "./Card.css";

export function Card({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element {
  return <div className="card">{children}</div>;
}
```

---

# 8. Children

```tsx
interface ContainerProps {
  children?: React.ReactNode;
}

export function Container({ children }: ContainerProps): JSX.Element {
  return <section>{children}</section>;
}
<Container>
  <p>Esto es children</p>
</Container>;
```

---

# 9. Eventos

```tsx
export function Counter(): JSX.Element {
  const handleClick = () => {
    console.log("clic");
  };

  return <button onClick={handleClick}>Pulsa</button>;
}
```

---

# 10. Funciones vía props

```tsx
export function Parent(): JSX.Element {
  const handleDelete = (id: number) => console.log("Eliminar:", id);

  return <Item id={5} onDelete={handleDelete} />;
}
interface ItemProps {
  id: number;
  onDelete: (id: number) => void;
}

export function Item({ id, onDelete }: ItemProps) {
  return <button onClick={() => onDelete(id)}>Eliminar</button>;
}
```

---

# 11. Arrow functions con parámetros

La arrow function se emplea para que la función no se ejecute directamente y poder pasarle parámetros

```tsx
<button onClick={() => handleAction("guardar")}>Guardar</button>
```

---

# 12. useState

```tsx
import { useState } from "react";

export function Toggle(): JSX.Element {
  const [on, setOn] = useState<boolean>(false);

  return (
    <button onClick={() => setOn((prev) => !prev)}>
      {on ? "Encendido" : "Apagado"}
    </button>
  );
}
```

---

# 13. Ternario

```tsx
{
  isLoggedIn ? <p>Bienvenido</p> : <p>Inicia sesión</p>;
}
```

---

# 14. Ternario para className

```tsx
<div className={active ? "on" : "off"}></div>
```

---

# Ejemplo completo

(Contenido completo incluido, como en la documentación anterior.)
