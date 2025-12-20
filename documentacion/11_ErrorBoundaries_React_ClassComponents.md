# Manejo de errores en React con Class Components

## Error Boundaries usando `componentDidCatch` (React + TypeScript)

---

## Comentario introductorio

> **Este documento explica, desde cero y de forma profesional, cómo manejar errores en aplicaciones React utilizando _Class Components_ mediante un _Error Boundary_.**  
> Aunque hoy en día React promueve mayoritariamente los _Functional Components_, **los Error Boundaries solo pueden implementarse oficialmente con Class Components**, por lo que este conocimiento sigue siendo obligatorio a nivel profesional.
>
> Aprenderás:
>
> - Qué es un Error Boundary y para qué sirve
> - Cuándo y por qué usar `componentDidCatch`
> - Cómo implementar un Error Boundary en TypeScript
> - Cómo envolver componentes para proteger tu aplicación de fallos inesperados

---

## 1. ¿Qué es un Error Boundary?

Un **Error Boundary** es un componente especial de React que:

- Captura errores de **renderizado**, **ciclo de vida** y **constructores** de sus componentes hijos
- Evita que toda la aplicación se rompa
- Muestra una UI alternativa (fallback) cuando ocurre un error

### Qué errores captura

✔ Errores en `render()`  
✔ Errores en `componentDidMount`, `componentDidUpdate`, etc.  
✔ Errores en componentes hijos

### Qué errores NO captura

✘ Errores en eventos (`onClick`, `onChange`, etc.)  
✘ Errores en código asíncrono (`setTimeout`, `fetch`)  
✘ Errores del propio Error Boundary

---

## 2. ¿Por qué solo Class Components?

React **no permite Error Boundaries con hooks**.  
Esto es una decisión explícita del core team.

Para crear un Error Boundary se requiere implementar al menos uno de estos métodos del ciclo de vida:

- `static getDerivedStateFromError`
- `componentDidCatch`

En este documento nos enfocamos en **`componentDidCatch`**, ya que:

- Permite capturar el error
- Permite registrar información adicional (logging, monitoring)

---

## 3. `componentDidCatch`: concepto clave

### Definición

`componentDidCatch` es un método del ciclo de vida que se ejecuta **cuando un componente hijo lanza un error**.

```ts
componentDidCatch(error: Error, info: React.ErrorInfo)
```

### Parámetros

- `error`: el error lanzado
- `info`: información del componente donde ocurrió el fallo (stack trace)

### Uso profesional

- Cambiar el estado para mostrar una UI alternativa
- Enviar errores a herramientas como Sentry, Datadog, LogRocket, etc.

---

## 4. Implementación básica de un Error Boundary (TypeScript)

### 4.1 Definición del estado

Un Error Boundary necesita **estado interno** para saber si ocurrió un error.

```ts
interface ErrorBoundaryState {
  hasError: boolean;
}
```

---

### 4.2 Creación del Error Boundary

```tsx
import React, { Component, ReactNode } from "react";

/*
  ErrorBoundary es un Class Component que captura errores
  de los componentes hijos y evita que la app completa se rompa
*/
interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    // Estado inicial: no hay errores
    this.state = {
      hasError: false,
    };
  }

  /*
    componentDidCatch se ejecuta cuando un componente hijo
    lanza un error durante render o ciclo de vida
  */
  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Actualizamos el estado para mostrar una UI alternativa
    this.setState({ hasError: true });

    // Aquí se suele enviar el error a un sistema de monitoreo
    console.error("Error capturado por ErrorBoundary:", error);
    console.error("Información del componente:", info);
  }

  render() {
    // Si ocurrió un error, mostramos una UI segura
    if (this.state.hasError) {
      return <h2>Algo salió mal. Intenta recargar la página.</h2>;
    }

    // Si no hay errores, renderizamos los componentes hijos
    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## 5. Componente que genera un error (ejemplo controlado)

Para entender el funcionamiento, creamos un componente que **falla intencionalmente**.

```tsx
/*
  Este componente lanza un error cuando se renderiza.
  Es solo para fines educativos.
*/
const BrokenComponent: React.FC = () => {
  throw new Error("Error de prueba en BrokenComponent");

  // Nunca se renderiza
  return <div>Este texto no se verá</div>;
};

export default BrokenComponent;
```

---

## 6. Uso del Error Boundary envolviendo componentes

```tsx
import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import BrokenComponent from "./BrokenComponent";

/*
  App envuelve los componentes peligrosos
  dentro del ErrorBoundary
*/
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrokenComponent />
    </ErrorBoundary>
  );
};

export default App;
```

### Qué ocurre paso a paso

1. `BrokenComponent` se intenta renderizar
2. Lanza un error
3. React detiene el render
4. `componentDidCatch` se ejecuta
5. `hasError` pasa a `true`
6. Se renderiza la UI alternativa
7. La aplicación NO se rompe

---

## 7. Buenas prácticas profesionales

### Dónde colocar Error Boundaries

✔ Alrededor de rutas  
✔ En secciones críticas (formularios, dashboards)  
✔ En componentes de terceros

✘ No envolver toda la app sin criterio  
✘ No usarlos para lógica de negocio

---

### Logging profesional

En proyectos reales, dentro de `componentDidCatch` se suele hacer:

```ts
componentDidCatch(error: Error, info: React.ErrorInfo) {
  this.setState({ hasError: true });

  sendErrorToMonitoringService({
    error,
    componentStack: info.componentStack,
  });
}
```

---

## 8. Resumen profesional

- Los Error Boundaries **siguen siendo obligatorios** en React
- Solo pueden implementarse con **Class Components**
- `componentDidCatch` permite:
  - Capturar errores
  - Evitar caídas totales
  - Registrar información crítica
- Son una **señal clara de madurez profesional** en un proyecto React

---

## Conclusión

Dominar Error Boundaries demuestra que:

- Entiendes el ciclo de vida de React
- Sabes proteger aplicaciones en producción
- Conoces patrones reales de arquitectura frontend

Este conocimiento **sigue siendo evaluado en entrevistas técnicas** y usado en aplicaciones empresariales.
