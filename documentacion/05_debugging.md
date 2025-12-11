``` ts
/**
 * Documentación breve (comentario al inicio):
 *
 * Este documento explica, para una persona principiante que trabaja con React + TypeScript,
 * cómo usar cuatro herramientas/estrategias fundamentales para detectar y entender errores:
 *  - la consola del navegador (console),
 *  - el uso del statement `debugger` y breakpoints,
 *  - React Strict Mode,
 *  - y React DevTools (extensión del navegador).
 *
 * Cada sección contiene explicación profesional-práctica + un ejemplo sencillo en TSX/TS
 * con comentarios línea a línea que muestran cómo aplicar la técnica en un proyecto real.
 *
 * Recomendaciones generales:
 *  - Trabaja siempre en modo desarrollo (NODE_ENV=development) para aprovechar mensajes y source maps.
 *  - Asegúrate de que tu bundler genere source maps (Create React App lo hace por defecto en dev).
 *  - Elimina o silencia logs antes de producción (o usa técnicas condicionales).
 */
```

# Documentación: detectar errores en React + TypeScript

------------------------------------------------------------------------

## 1) Uso de la consola (console) para detectar errores

### ¿Por qué y cuándo usarla?

La consola del navegador es la primera herramienta: imprime valores,
estructuras, tiempos y advertencias.

### Métodos importantes

-   `console.log(...)`
-   `console.warn(...)`
-   `console.error(...)`
-   `console.table(...)`
-   `console.group(...)`
-   `console.assert(...)`
-   `console.time(...)`

### Ejemplo

``` tsx
export default function CounterConsole() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.group("Counter");
    console.log("Valor actual:", count);
    console.groupEnd();
  }, [count]);
  return <button onClick={() => setCount(c => c + 1)}>+</button>;
}
```

------------------------------------------------------------------------

## 2) Uso de `debugger`

``` tsx
const handleClick = () => {
  debugger;
  setCount(count + 1);
};
```

------------------------------------------------------------------------

## 3) React Strict Mode

``` tsx
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

------------------------------------------------------------------------

## 4) React DevTools

Inspección de estado, props y profiling desde el navegador.

------------------------------------------------------------------------

## Ejemplo completo App.tsx

``` tsx
export default function App() {
  return (
    <div>
      <h1>Debug React</h1>
    </div>
  );
}
```
