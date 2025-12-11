# Documentación Profesional de Refs, forwardRef, useImperativeHandle y Portals en React + TypeScript

------------------------------------------------------------------------

## Comentario Inicial

Este documento explica, con ejemplos en React + TypeScript, los patrones
profesionales para trabajar con:

-   Refs (diferentes usos)
-   forwardRef (compartir refs)
-   useImperativeHandle (API controlada desde refs)
-   Portals (modales y overlays)

Cada sección contiene: - Explicación técnica profesional - Ejemplo
completo explicado línea por línea

Requisitos: - React 16.8+ - TypeScript configurado - Para portals:
`<div id="modal-root"></div>` en `index.html`

------------------------------------------------------------------------

## 1. Refs en React --- usos y buenas prácticas

Una ref es una referencia mutable que persiste entre renders sin
provocar re-render.

### Usos comunes

-   Acceso al DOM (focus, medir tamaño)
-   Almacenar valores mutables
-   Integración con librerías externas
-   Comunicación con componentes hijos

------------------------------------------------------------------------

### Ejemplo completo

``` tsx
import React, { useRef, useEffect, useState } from "react";

export function EjemploRefUsos(): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const renderCount = useRef<number>(0);
  const [isMounted, setIsMounted] = useState(true);

  const callbackRef = (node: HTMLDivElement | null) => {
    if (node) console.log("Callback ref montado:", node);
    else console.log("Callback ref desmontado");
  };

  useEffect(() => {
    renderCount.current += 1;
  });

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current?.focus()}>
        Focus
      </button>

      <p>Render count: {renderCount.current}</p>

      <button onClick={() => setIsMounted(!isMounted)}>
        Toggle
      </button>

      {isMounted && <div ref={callbackRef}>Caja</div>}
    </div>
  );
}
```

------------------------------------------------------------------------

## 2. forwardRef --- compartir refs entre componentes

Permite pasar refs a componentes funcionales.

### Ejemplo

``` tsx
import React, { forwardRef } from "react";

type FancyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const FancyButton = forwardRef<HTMLButtonElement, FancyButtonProps>(
  (props, ref) => {
    return <button ref={ref} {...props} />;
  }
);

export function UsoFancyButton(): JSX.Element {
  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      <FancyButton ref={btnRef}>Fancy</FancyButton>
      <button onClick={() => btnRef.current?.focus()}>Focus</button>
    </div>
  );
}
```

------------------------------------------------------------------------

## 3. useImperativeHandle --- API controlada

Permite definir qué expone una ref.

``` tsx
import React, { useImperativeHandle, useRef, forwardRef } from "react";

export type CustomInputHandle = {
  focus: () => void;
  clear: () => void;
};

export const CustomInput = forwardRef<CustomInputHandle>((props, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => inputRef.current && (inputRef.current.value = ""),
  }));

  return <input ref={inputRef} />;
});

export function UsoCustomInput(): JSX.Element {
  const customRef = React.useRef<CustomInputHandle | null>(null);

  return (
    <div>
      <CustomInput ref={customRef} />
      <button onClick={() => customRef.current?.focus()}>Focus</button>
      <button onClick={() => customRef.current?.clear()}>Clear</button>
    </div>
  );
}
```

------------------------------------------------------------------------

## 4. Portals --- Modales

Permite renderizar fuera del árbol principal.

``` tsx
import React from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function ModalPortal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;
  const modalRoot = document.getElementById("modal-root")!;

  return ReactDOM.createPortal(
    <div onClick={onClose}>
      <div>{children}</div>
    </div>,
    modalRoot
  );
}

export function UsoModalPortal() {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setOpen(true)}>Abrir</button>
      <ModalPortal isOpen={open} onClose={() => setOpen(false)}>
        <h2>Modal</h2>
      </ModalPortal>
    </div>
  );
}
```

------------------------------------------------------------------------

## 5. Buenas prácticas

-   No usar refs como sustituto del estado
-   forwardRef solo cuando sea necesario
-   useImperativeHandle para encapsular
-   Portals con accesibilidad y control de foco

------------------------------------------------------------------------

Documento preparado para uso profesional y académico.
