
# Construcción y uso de Custom Hooks flexibles en React con TypeScript

## Introducción (comentario explicativo inicial)

/*
En React, los **custom hooks** (hooks personalizados) son funciones que nos permiten
extraer y reutilizar lógica de estado y efectos entre distintos componentes.

Un custom hook:
- Empieza siempre por la palabra `use`
- Puede usar otros hooks internos de React (`useState`, `useEffect`, `useCallback`, etc.)
- No renderiza JSX, solo encapsula lógica
- Permite escribir código más limpio, mantenible y reutilizable

Cuando hablamos de **custom hooks flexibles**, nos referimos a hooks que:
- Aceptan parámetros configurables
- No dependen de un solo caso de uso
- Son fácilmente reutilizables en distintos componentes
- Están correctamente tipados con TypeScript
*/

---

## 1. ¿Por qué usar Custom Hooks?

En aplicaciones profesionales de React, es común que:
- Varias pantallas compartan la misma lógica
- El código de los componentes crezca demasiado
- Se repita lógica de estado y efectos

Los custom hooks solucionan esto al:
- Separar lógica de presentación
- Reducir duplicación de código
- Mejorar la legibilidad
- Facilitar pruebas y mantenimiento

---

## 2. Reglas fundamentales de los Custom Hooks

Antes de crearlos, es imprescindible conocer estas reglas:

1. **El nombre debe empezar por `use`**
   - Ejemplo válido: `useCounter`
   - Ejemplo inválido: `counterHook`

2. **Solo se llaman en el nivel superior**
   - No dentro de `if`, `for`, `while`

3. **Solo se usan dentro de componentes o de otros hooks**

Estas reglas garantizan que React pueda manejar correctamente el ciclo de vida del hook.

---

## 3. Estructura básica de un Custom Hook en TypeScript

Un custom hook es simplemente una función:

```ts
function useNombreDelHook() {
  // lógica interna
  return {};
}
```

Pero a nivel profesional, debemos:
- Tipar los parámetros de entrada
- Tipar el valor de retorno
- Diseñarlo para que sea reutilizable

---

## 4. Ejemplo 1: Custom Hook simple y flexible (`useCounter`)

### Objetivo
Crear un hook reutilizable para manejar un contador, con:
- Valor inicial configurable
- Funciones para incrementar, decrementar y resetear

---

### Código del Hook: `useCounter.ts`

```ts
import { useState } from "react";

/*
Este custom hook encapsula la lógica de un contador.
Es flexible porque permite definir un valor inicial opcional.
*/
export function useCounter(initialValue: number = 0) {
  // useState maneja el estado interno del contador
  const [count, setCount] = useState<number>(initialValue);

  // Incrementa el contador en 1
  const increment = () => {
    setCount(prev => prev + 1);
  };

  // Decrementa el contador en 1
  const decrement = () => {
    setCount(prev => prev - 1);
  };

  // Resetea el contador al valor inicial
  const reset = () => {
    setCount(initialValue);
  };

  /*
  Retornamos un objeto con:
  - El estado actual
  - Las funciones que permiten modificarlo
  */
  return {
    count,
    increment,
    decrement,
    reset,
  };
}
```

---

### Uso del Hook en un Componente

```tsx
import React from "react";
import { useCounter } from "./useCounter";

export function CounterExample() {
  // Usamos el custom hook con un valor inicial de 10
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <p>Valor actual: {count}</p>

      {/* Cada botón ejecuta una función del hook */}
      <button onClick={increment}>Incrementar</button>
      <button onClick={decrement}>Decrementar</button>
      <button onClick={reset}>Resetear</button>
    </div>
  );
}
```

---

## 5. Ejemplo 2: Custom Hook flexible con efectos (`useFetch`)

### Objetivo
Crear un hook reutilizable para:
- Obtener datos desde una API
- Manejar estados de carga y error
- Ser reutilizable con cualquier URL

---

### Tipos necesarios

```ts
/*
Definimos una interfaz genérica para el estado de la petición.
Esto hace el hook reutilizable para cualquier tipo de datos.
*/
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
```

---

### Código del Hook: `useFetch.ts`

```ts
import { useEffect, useState } from "react";

/*
Este custom hook recibe una URL y obtiene datos desde ella.
Utiliza genéricos para ser completamente flexible.
*/
export function useFetch<T>(url: string) {
  // Estado inicial del fetch
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    // Indicamos que comienza la carga
    setState(prev => ({ ...prev, loading: true }));

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Error en la petición");
        }
        return response.json();
      })
      .then((data: T) => {
        // Si todo va bien, guardamos los datos
        setState({
          data,
          loading: false,
          error: null,
        });
      })
      .catch(error => {
        // Si ocurre un error, lo guardamos
        setState({
          data: null,
          loading: false,
          error: error.message,
        });
      });
  }, [url]); // El efecto se ejecuta cada vez que cambia la URL

  // Retornamos el estado completo
  return state;
}
```

---

### Uso del Hook en un Componente

```tsx
import React from "react";
import { useFetch } from "./useFetch";

// Definimos el tipo de datos que esperamos
interface User {
  id: number;
  name: string;
  email: string;
}

export function UsersList() {
  // Pasamos el tipo User[] al hook
  const { data, loading, error } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  // Mientras carga, mostramos un mensaje
  if (loading) {
    return <p>Cargando...</p>;
  }

  // Si hay error, lo mostramos
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {/* Renderizamos los datos obtenidos */}
      {data?.map(user => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}
```

---

## 6. Buenas prácticas profesionales

- Diseñar hooks **con un solo propósito**
- Evitar lógica específica de UI dentro del hook
- Tipar siempre entradas y salidas
- Usar genéricos para máxima reutilización
- Retornar objetos claros y bien nombrados
- Documentar el hook con comentarios claros

---

## 7. Conclusión

Los custom hooks flexibles son una herramienta clave en React profesional.
Permiten:
- Código más limpio
- Mejor reutilización
- Componentes más simples
- Escalabilidad en proyectos grandes

Dominar su construcción y uso es esencial para trabajar con React y TypeScript a nivel profesional.
