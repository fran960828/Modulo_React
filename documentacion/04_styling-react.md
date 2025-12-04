# Documentación práctica: Estilos en React + TypeScript

> Guía para principiantes con enfoque profesional. Contiene ejemplos
> explicados paso a paso.

------------------------------------------------------------------------

## Índice

1.  CSS Vanilla\
2.  CSS por componente\
3.  Inline Styles\
4.  Condicionales en Inline Styles\
5.  Condicionales en className\
6.  CSS Modules\
7.  styled-components y props con \$\
8.  Uso de & en styled-components\
9.  TailwindCSS completo

------------------------------------------------------------------------

# 1. Uso de CSS Vanilla

styles.css

``` css
body {
  font-family: sans-serif;
}

.btn {
  background: blue;
  color: white;
}
```

main.tsx

``` tsx
import "./styles.css";
```

App.tsx

``` tsx
<button className="btn">Botón</button>
```

------------------------------------------------------------------------

# 2. CSS por componente

Card.css

``` css
.card {
  border: 1px solid gray;
}
```

Card.tsx

``` tsx
import "./Card.css";

export const Card = () => {
  return <div className="card">Tarjeta</div>;
};
```

------------------------------------------------------------------------

# 3. Inline Styles

``` tsx
<div style={{ backgroundColor: "red", padding: 10 }}>
  Caja
</div>
```

------------------------------------------------------------------------

# 4. Condicionales en Inline Styles

``` tsx
<div style={{ backgroundColor: active ? "green" : "gray" }}>
  Estado
</div>
```

------------------------------------------------------------------------

# 5. Condicionales en className

``` tsx
<button className={activo ? "btn active" : "btn"}>
  Botón
</button>
```

------------------------------------------------------------------------

# 6. CSS Modules

Button.module.css

``` css
.root {
  background: purple;
}
```

Button.tsx

``` tsx
import styles from "./Button.module.css";

export const Button = () => (
  <button className={styles.root}>Botón</button>
);
```

------------------------------------------------------------------------

# 7. styled-components con \$

``` tsx
import styled from "styled-components";

const Box = styled.div<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? "green" : "red")};
`;
```

------------------------------------------------------------------------

# 8. Uso de &

``` tsx
const Card = styled.div`
  &:hover {
    transform: scale(1.05);
  }

  & h3 {
    color: blue;
  }
`;
```

------------------------------------------------------------------------

# 9. TailwindCSS

Instalación:

``` bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

index.css

``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Uso:

``` tsx
<button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">
  Botón Tailwind
</button>
```

Responsive:

``` tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"></div>
```
