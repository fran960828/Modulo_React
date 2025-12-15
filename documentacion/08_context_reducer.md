# Documentación React + TypeScript

Esta documentación está dirigida a personas **principiantes en React con TypeScript**, pero con el objetivo de que comprendan los conceptos **a un nivel profesional**. Se explican problemas comunes, sus soluciones y patrones recomendados, acompañados de **ejemplos simples, claros y completamente comentados**.

---

## 1. Component Composition como solución al Prop Drilling

```ts
/**
 * PROBLEMA: PROP DRILLING
 * El prop drilling ocurre cuando un dato debe pasar por muchos componentes intermedios
 * que no lo utilizan, solo para llegar a un componente profundo.
 *
 * SOLUCIÓN: COMPONENT COMPOSITION
 * En lugar de pasar datos como props a través de múltiples niveles,
 * se pasan directamente los componentes ya configurados como `children`.
 *
 * BENEFICIOS:
 * - Reduce acoplamiento entre componentes
 * - Mejora la legibilidad
 * - Facilita la reutilización
 */
```

### Ejemplo

```tsx
// Componente contenedor que NO necesita conocer el dato
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Layout general</h1>
      {children} {/* Se renderiza el contenido recibido */}
    </div>
  );
}

// Componente que SÍ necesita el dato
function UserInfo({ name }: { name: string }) {
  return <p>Usuario: {name}</p>;
}

// Componente raíz
export function App() {
  return (
    <Layout>
      {/* El componente ya recibe el dato sin prop drilling */}
      <UserInfo name="Juan" />
    </Layout>
  );
}
```

---

## 2. createContext + Provider como solución al Prop Drilling (con TypeScript)

```ts
/**
 * CONTEXT API
 * Permite compartir datos globales sin pasarlos manualmente por props.
 *
 * createContext: crea el contexto
 * Provider: provee el valor a los componentes hijos
 *
 * TypeScript: se debe definir explícitamente el tipo del contexto
 */
```

### Definición del contexto

```tsx
import { createContext } from "react";

// 1. Definimos el tipo de los datos del contexto
type UserContextType = {
  name: string;
  setName: (name: string) => void;
};

// 2. Creamos el contexto con un valor inicial (null)
export const UserContext = createContext<UserContextType | null>(null);
```

### Uso del Provider

```tsx
import { useState } from "react";
import { UserContext } from "./UserContext";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState("Juan");

  return (
    <UserContext.Provider value={{ name, setName }}>
      {children}
    </UserContext.Provider>
  );
}
```

---

## 3. useContext para consumir el contexto (tipado seguro)

```ts
/**
 * useContext
 * Permite acceder al valor del contexto desde cualquier componente hijo.
 *
 * IMPORTANTE:
 * - Se debe manejar el caso `null`
 * - Es buena práctica crear un hook personalizado
 */
```

### Hook personalizado

```tsx
import { useContext } from "react";
import { UserContext } from "./UserContext";

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser debe usarse dentro de UserProvider");
  }

  return context;
}
```

### Uso en un componente

```tsx
import { useUser } from "./useUser";

function Profile() {
  const { name, setName } = useUser();

  return (
    <div>
      <p>Nombre actual: {name}</p>
      <button onClick={() => setName("Pedro")}>Cambiar nombre</button>
    </div>
  );
}
```

---

## 4. createContext con Consumer (versión antigua)

```ts
/**
 * CONTEXT CON CONSUMER
 * Antes de los hooks, se accedía al contexto mediante Consumer.
 * Hoy en día se considera menos legible.
 */
```

### Ejemplo

```tsx
import { UserContext } from "./UserContext";

function Profile() {
  return (
    <UserContext.Consumer>
      {(context) => {
        if (!context) return null;

        return <p>Usuario: {context.name}</p>;
      }}
    </UserContext.Consumer>
  );
}
```

---

## 5. useReducer como alternativa a useState

```ts
/**
 * useReducer
 * Se utiliza cuando el estado:
 * - Es complejo
 * - Tiene múltiples acciones
 * - Sigue una lógica similar a Redux
 *
 * Ventajas:
 * - Estado más predecible
 * - Lógica centralizada
 */
```

### Ejemplo simple

```tsx
import { useReducer } from "react";

// 1. Definimos el tipo del estado
type State = {
  count: number;
};

// 2. Definimos las acciones posibles
type Action = { type: "increment" } | { type: "decrement" };

// 3. Reducer: recibe estado y acción
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export function Counter() {
  // 4. Inicializamos el reducer
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
}
```

---

## Conclusión

- **Component Composition**: ideal para estructuras simples
- **Context + Provider**: solución estándar al prop drilling
- **useContext con hook personalizado**: enfoque profesional
- **Consumer**: legado, evitar en proyectos nuevos
- **useReducer**: recomendado para estados complejos

Esta combinación de patrones es fundamental para aplicaciones React escalables y mantenibles.
