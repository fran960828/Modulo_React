# Documentación React + TypeScript

Esta documentación está orientada a **personas principiantes en React con TypeScript**, pero explica los conceptos con el **nivel de detalle y criterio profesional** que se espera en proyectos reales.

El objetivo principal es comprender **qué son los side effects**, cuándo y cómo usar correctamente `useEffect`, cómo funciona su **matriz de dependencias**, y cómo `useCallback` ayuda a evitar problemas comunes relacionados con dependencias y recreación de funciones.

---

## 1. ¿Qué es un Side Effect en React?

```ts
/**
 * SIDE EFFECT (EFECTO SECUNDARIO)
 * Un side effect es cualquier operación que:
 * - Ocurre fuera del flujo normal de renderizado
 * - Interactúa con sistemas externos o estados externos al componente
 * - No es puramente una transformación de props -> UI
 *
 * Ejemplos comunes de side effects:
 * - Llamadas a APIs (fetch, axios)
 * - Suscripciones (event listeners, websockets)
 * - Manipulación del DOM manual
 * - Timers (setTimeout, setInterval)
 * - Escritura en localStorage / sessionStorage
 *
 * IMPORTANTE:
 * El render de un componente debe ser PURO.
 * Los side effects deben ejecutarse de forma controlada.
 */
```

### Ejemplo conceptual

```tsx
function Example({ value }: { value: number }) {
  // ❌ Esto NO es un side effect
  const doubled = value * 2;

  // ❌ Esto sería una mala práctica si se ejecuta durante el render
  // localStorage.setItem('value', value.toString());

  return <p>{doubled}</p>;
}
```

---

## 2. useEffect: cuándo usarlo y cuándo es mala práctica

```ts
/**
 * useEffect
 * Hook diseñado específicamente para manejar side effects.
 * Se ejecuta DESPUÉS del render.
 *
 * CUÁNDO ES CONVENIENTE USARLO:
 * - Llamadas a APIs al montar el componente
 * - Sincronizar estado con sistemas externos
 * - Suscripciones y limpieza de recursos
 * - Reaccionar a cambios específicos de props o state
 *
 * CUÁNDO ES REDUNDANTE O MALA PRÁCTICA:
 * - Para cálculos derivados (usar variables o useMemo)
 * - Para actualizar estado basado directamente en props
 * - Para lógica que puede resolverse durante el render
 */
```

### Ejemplo correcto: llamada a API

```tsx
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    // Side effect: llamada a un sistema externo
    fetch("https://api.example.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []); // Se ejecuta solo al montar el componente

  return (
    <ul>
      {users.map((user) => (
        <li key={user}>{user}</li>
      ))}
    </ul>
  );
}
```

### Ejemplo de mala práctica

```tsx
function BadExample({ count }: { count: number }) {
  const [double, setDouble] = useState(0);

  // ❌ useEffect innecesario
  useEffect(() => {
    setDouble(count * 2);
  }, [count]);

  // ✅ Esto debería calcularse directamente
  // const double = count * 2;

  return <p>{double}</p>;
}
```

---

## 3. Matriz de dependencias de useEffect

```ts
/**
 * MATRIZ DE DEPENDENCIAS
 * Es el segundo argumento de useEffect.
 * Define CUÁNDO debe ejecutarse el efecto.
 *
 * Reglas fundamentales:
 * - Debe incluir TODAS las variables usadas dentro del efecto
 * - React compara por referencia (===)
 * - Cambios en cualquiera de las dependencias disparan el efecto
 */
```

### ¿Qué se puede pasar como dependencia?

```ts
/**
 * DEPENDENCIAS VÁLIDAS:
 * - Props
 * - State
 * - Funciones
 * - Valores derivados (si cambian por referencia)
 */
```

### Ejemplo con props y state

```tsx
function Example({ userId }: { userId: number }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then((res) => res.json())
      .then(setUser);
  }, [userId]); // userId es una prop

  return <pre>{JSON.stringify(user)}</pre>;
}
```

---

## 4. useCallback para funciones en la matriz de dependencias

```ts
/**
 * PROBLEMA:
 * Las funciones se recrean en cada render.
 * Si una función está en la matriz de dependencias,
 * el useEffect se ejecutará en cada render.
 *
 * SOLUCIÓN: useCallback
 * Memoriza la función y evita recrearla innecesariamente.
 */
```

### Ejemplo sin useCallback (problema)

```tsx
function WithoutUseCallback() {
  const [count, setCount] = useState(0);

  const logCount = () => {
    console.log(count);
  };

  useEffect(() => {
    logCount();
  }, [logCount]); // ❌ se recrea en cada render

  return <button onClick={() => setCount(count + 1)}>+</button>;
}
```

### Ejemplo con useCallback (correcto)

```tsx
import { useCallback, useEffect, useState } from "react";

function WithUseCallback() {
  const [count, setCount] = useState(0);

  const logCount = useCallback(() => {
    console.log(count);
  }, [count]); // count es dependencia

  useEffect(() => {
    logCount();
  }, [logCount]); // ✅ estable

  return <button onClick={() => setCount(count + 1)}>+</button>;
}
```

---

## 5. Matriz de dependencias de useCallback

```ts
/**
 * useCallback(fn, deps)
 * Devuelve una versión memorizada de la función.
 *
 * La función solo se recrea si alguna dependencia cambia.
 */
```

### ¿Qué se puede pasar como dependencia?

```ts
/**
 * DEPENDENCIAS PERMITIDAS EN useCallback:
 * - Props
 * - State
 * - Otras funciones memorizadas
 * - Valores derivados usados dentro de la función
 *
 * NO es necesario incluir:
 * - setState (son estables)
 * - Variables que no se usan dentro de la función
 */
```

### Ejemplo profesional

```tsx
function Form() {
  const [name, setName] = useState("");

  const handleSubmit = useCallback(() => {
    console.log("Enviando:", name);
  }, [name]); // name es usado dentro de la función

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
}
```

---

## Conclusión

- **Side effects** deben estar controlados y separados del render
- **useEffect** solo debe usarse cuando hay interacción externa
- La **matriz de dependencias** no es opcional, es contractual
- **useCallback** es clave para efectos estables y rendimiento
- Entender referencias es fundamental para dominar estos hooks

Estos conceptos son esenciales para escribir código React **predecible, eficiente y profesional**.
