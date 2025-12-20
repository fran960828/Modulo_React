# Optimización de Rendimiento en React con TypeScript

Documentación para principiantes (nivel profesional)

---

## 1. Uso de React DevTools para analizar el árbol de componentes y el rendimiento

```ts
/**
 * React DevTools es una extensión de navegador que permite inspeccionar
 * el árbol de componentes de una aplicación React en tiempo real.
 *
 * Es fundamental para entender:
 * - Qué componentes existen en la aplicación.
 * - Cuáles se renderizan nuevamente.
 * - Por qué se renderizan.
 * - Cómo afectan esos renderizados al rendimiento.
 *
 * A nivel profesional, React DevTools es la herramienta principal
 * para detectar renderizados innecesarios y cuellos de botella.
 */
```

### Explicación

React DevTools ofrece dos secciones clave:

- **Components**: muestra el árbol de componentes, sus props y estado.
- **Profiler**: mide cuánto tiempo tarda cada componente en renderizarse.

En la pestaña **Profiler** puedes:

1. Grabar una interacción.
2. Ver qué componentes se renderizaron.
3. Identificar renderizados innecesarios.

---

### Ejemplo práctico

```tsx
import React, { useState } from "react";

const Child: React.FC = () => {
  console.log("Child renderizado");
  return <p>Componente hijo</p>;
};

const Parent: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Incrementar contador</button>

      {/* Aunque Child no usa count, se renderiza cada vez */}
      <Child />
    </>
  );
};

export default Parent;
```

---

## 2. Uso de React.memo

```ts
/**
 * React.memo es una función de alto orden que memoriza un componente.
 *
 * El componente solo se volverá a renderizar si sus props cambian.
 *
 * Es ideal para:
 * - Componentes de presentación.
 * - Componentes que reciben props simples.
 * - Evitar renderizados en cascada.
 */
```

### Ejemplo

```tsx
import React, { useState, memo } from "react";

interface ChildProps {
  text: string;
}

const Child = memo(({ text }: ChildProps) => {
  return <p>{text}</p>;
});
```

---

## 3. useCallback

```ts
/**
 * useCallback memoriza una función para que mantenga
 * la misma referencia entre renderizados.
 *
 * Es fundamental cuando:
 * - Se pasan funciones como props.
 * - Se usan componentes memorizados (React.memo).
 *
 * Sin useCallback, cada render crea una nueva función,
 * provocando renderizados innecesarios.
 */

import React, { useState, useCallback, memo } from "react";

interface ButtonProps {
  onClick: () => void;
}

// Componente memorizado
const Button = memo(({ onClick }: ButtonProps) => {
  console.log("Button renderizado");
  return <button onClick={onClick}>Click</button>;
});

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  // useCallback evita crear una nueva función en cada render
  const handleClick = useCallback(() => {
    console.log("Botón pulsado");
  }, []);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Incrementar contador</button>

      {/* Button no se renderiza al cambiar count */}
      <Button onClick={handleClick} />
    </>
  );
};

export default App;
```

---

## 4. useMemo

```ts
/**
 * useMemo memoriza el resultado de una función.
 *
 * La función solo se ejecuta nuevamente
 * cuando cambian sus dependencias.
 *
 * Se utiliza para:
 * - Cálculos pesados.
 * - Transformaciones de datos.
 * - Evitar ejecuciones innecesarias.
 */
import React, { useState, useMemo } from "react";

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  // useMemo evita recalcular este valor innecesariamente
  const expensiveCalculation = useMemo(() => {
    console.log("Cálculo costoso ejecutado");
    return count * 1000;
  }, [count]); // Solo se recalcula cuando count cambia

  return (
    <>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>

      <p>Resultado: {expensiveCalculation}</p>
    </>
  );
};

export default App;
```

---

## 5. key en listas

```ts
/**
 * key permite a React identificar elementos únicos en una lista.
 *
 * Usar el index como key es una mala práctica porque:
 * - Provoca errores de renderizado.
 * - Rompe el estado interno de los componentes.
 * - Reduce la eficiencia del algoritmo de reconciliación.
 */
interface Item {
  id: string;
  name: string;
}

const items: Item[] = [
  { id: "a1", name: "Elemento A" },
  { id: "b2", name: "Elemento B" },
];

{
  items.map((item) => <li key={item.id}>{item.name}</li>);
}
```

---

## 6. key para forzar render

```ts
/**
 * Asignar una key a un componente permite
 * forzar su desmontaje y montaje.
 *
 * React interpreta un cambio de key
 * como si fuera un componente completamente nuevo.
 */
import React, { useState } from "react";

const Form: React.FC = () => {
  return <input placeholder="Escribe algo" />;
};

const App: React.FC = () => {
  const [resetKey, setResetKey] = useState(0);

  return (
    <>
      <button onClick={() => setResetKey((prev) => prev + 1)}>
        Resetear formulario
      </button>

      {/* Al cambiar la key, Form se desmonta y se monta de nuevo */}
      <Form key={resetKey} />
    </>
  );
};

export default App;
```

---

## 7. Million.js

```ts
/**
 * Million.js es una librería de optimización de rendimiento
 * que reduce el costo del renderizado en React.
 *
 * Permite:
 * - Minimizar el Virtual DOM.
 * - Optimizar listas grandes.
 * - Reducir renders innecesarios automáticamente.
 */
```

---

## Conclusión

Esta documentación cubre los fundamentos profesionales
de optimización de rendimiento en React.
