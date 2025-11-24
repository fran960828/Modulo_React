# 📘 Documentación: Componentes en React con TypeScript

**(Básico, Estilos y Patrón Contenedor --- Explicado para
principiantes)**

## `<!-- comentario inicial -->`{=html}

> **Comentario inicial:**\
> Este documento está diseñado para principiantes que quieren aprender a
> trabajar con componentes en React usando TypeScript. Cada sección
> incluye una explicación clara y profesional, seguida de un ejemplo
> práctico completamente comentado para que puedas entender no solo
> *qué* se hace, sino *por qué* se hace.
>
> Aprenderás:\
> - Cómo crear un componente básico en React con TypeScript\
> - Cómo agregar estilos a un componente (CSS, CSS Modules y
> styled-components)\
> - Cómo pasar un componente dentro de un componente contenedor
> (Container Pattern)

------------------------------------------------------------------------

# 1. 🧩 Crear un Componente Básico en React con TypeScript

## 📘 Explicación

Un componente básico en React es una función que recibe propiedades
(opcionalmente) y devuelve JSX. En TypeScript debemos **tipar las
props** para que el editor pueda validar y darnos autocompletado.

------------------------------------------------------------------------

## 🧪 Ejemplo: `WelcomeMessage.tsx`

``` tsx
interface WelcomeMessageProps {
  name: string;
  age?: number;
}

export const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ name, age }) => {
  return (
    <div>
      <h1>Hola, {name}!</h1>
      {age && <p>Tienes {age} años.</p>}
    </div>
  );
};
```

------------------------------------------------------------------------

# 2. 🎨 Añadir Estilos CSS a un Componente

## 2.1. CSS tradicional

### Ejemplo

``` tsx
import "./UserCard.css"; 

interface UserCardProps {
  username: string;
}

export const UserCard: React.FC<UserCardProps> = ({ username }) => {
  return (
    <div className="card">
      <p className="username">{username}</p>
    </div>
  );
};
```

``` css
.card {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.username {
  font-size: 18px;
  font-weight: bold;
}
```

------------------------------------------------------------------------

## 2.2. CSS Modules

``` tsx
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  title: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ title }) => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
    </div>
  );
};
```

``` css
.container {
  background-color: #fafafa;
  padding: 12px;
  border-radius: 10px;
}

.title {
  font-size: 20px;
  font-weight: 600;
}
```

------------------------------------------------------------------------

## 2.3. Styled-components

``` tsx
import styled from "styled-components";

interface AlertBoxProps {
  message: string;
}

const Box = styled.div`
  background-color: #ffe4e4;
  border: 1px solid #ff9b9b;
  padding: 12px;
  border-radius: 8px;
`;

export const AlertBox: React.FC<AlertBoxProps> = ({ message }) => {
  return <Box>{message}</Box>;
};
```

------------------------------------------------------------------------

# 3. 🗂️ Patrón Contenedor (Container Pattern)

## 3.1. Usando `children`

``` tsx
interface CardContainerProps {
  children: React.ReactNode;
}

export const CardContainer: React.FC<CardContainerProps> = ({ children }) => {
  return (
    <div style={{ border: "1px solid #aaa", padding: "16px", borderRadius: "10px" }}>
      {children}
    </div>
  );
};
```

------------------------------------------------------------------------

## 3.2. Pasando el componente como prop

``` tsx
interface LayoutProps {
  Component: React.FC;
}

export const Layout: React.FC<LayoutProps> = ({ Component }) => {
  return (
    <div style={{ padding: "20px", border: "2px solid #333" }}>
      <Component />
    </div>
  );
};
```

``` tsx
export const Dashboard: React.FC = () => {
  return <h1>Bienvenido al Dashboard</h1>;
};
```

``` tsx
<Layout Component={Dashboard} />
```
