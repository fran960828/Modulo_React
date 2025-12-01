# Documentación práctica --- React + TypeScript (para principiantes con nivel profesional)

```ts
/**
 * Este documento explica, con ejemplos comentados, varias técnicas importantes en React + TypeScript:
 *  - Uso de Fragment como envoltorio cuando un return necesita >1 elemento.
 *  - Reenviar (forward) props a elementos envueltos (passthrough props).
 *  - Uso de múltiples "slots" JSX (children nombrados).
 *  - Tipar componentes de configuración dinámicamente (generics para props).
 *  - Establecer valores por defecto para props.
 *  - Controlar inputs con onChange y useState y persistir su valor.
 *  - Mantener arrays inmutables al actualizar estado (spread operator).
 *  - Lifting state up para compartir estado entre componentes hermanos.
 *  - Derivar estado a partir de props (evitando antipatterns).
 *
 * Cada sección contiene: explicación + ejemplo en TypeScript + comentarios línea a línea.
 */
```

---

# 1. Uso de `Fragment` como envoltorio de más de 1 elemento en el `return`

**Explicación:**\
En JSX no puedes devolver dos elementos hermanos sin un único padre.
`React.Fragment` (abreviado `<>...</>`) permite agrupar elementos sin
añadir nodos extra al DOM.

**Ejemplo:**

```tsx
import React from "react";

export function FragmentExample(): JSX.Element {
  return (
    <>
      <header>Encabezado</header>
      <p>Parrafo junto al encabezado sin wrapper DOM extra.</p>
    </>
  );
}
```

---

# 2. Forwarding props to wrapped elements

**Explicación:**\
Cuando envuelves un elemento, debes reenviar las props con `...rest`.
Para reenviar `ref`, se usa `forwardRef`.

**Ejemplo:**

```tsx
import React, { forwardRef } from "react";

type Props = {
  variant?: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const FancyButton = forwardRef<HTMLButtonElement, Props>(
  function FancyButton({ variant = "primary", children, ...rest }, ref) {
    const className = `fancy-btn ${variant} ${rest.className ?? ""}`.trim();

    return (
      <button ref={ref} className={className} {...rest}>
        {children}
      </button>
    );
  }
);
```

---

# 3. Múltiples JSX slots

**Explicación:**\
Permite definir áreas nombradas (`header`, `footer`...) de un
componente.

```tsx
import React from "react";

type CardProps = {
  header?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
};

export function Card({ header, content, footer }: CardProps): JSX.Element {
  return (
    <article className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-content">{content}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </article>
  );
}
```

---

# 4. Settings component types dinámicamente (Generics)

```tsx
import React from "react";

type SettingsPanelProps<TSettings> = {
  settings: TSettings;
  onChange: (next: TSettings) => void;
};

export function SettingsPanel<TSettings>({
  settings,
  onChange,
}: SettingsPanelProps<TSettings>) {
  return (
    <div>
      <pre>{JSON.stringify(settings, null, 2)}</pre>
      <button>Guardar</button>
    </div>
  );
}
```

---

# 5. Default props

```tsx
type BadgeProps = {
  label: string;
  size?: "sm" | "md" | "lg";
  color?: string;
};

export function Badge({ label, size = "md", color = "#eee" }: BadgeProps) {
  const style = {
    padding: size === "sm" ? "2px 6px" : size === "lg" ? "8px 14px" : "4px 8px",
    background: color,
  };
  return <span style={style}>{label}</span>;
}
```

---

# 6. `onChange` + `useState` para inputs controlados

```tsx
import React, { useState } from "react";

export function ControlledInputExample() {
  const [name, setName] = useState<string>("");
  const [saved, setSaved] = useState<string | null>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSaved(name);
      }}
    >
      <label>
        Nombre:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <button type="submit">Guardar</button>

      {saved !== null && <p>Valor guardado: {saved}</p>}
    </form>
  );
}
```

---

# 7. Arrays inmutables con spread operator

```tsx
import React, { useState } from "react";

export function ImmutableArrayExample() {
  const [items, setItems] = useState<string[]>(["manzana", "pera"]);

  function addItem(item: string) {
    setItems((prev) => [...prev, item]);
  }

  function removeItem(indexToRemove: number) {
    setItems((prev) => prev.filter((_, i) => i !== indexToRemove));
  }

  return (
    <div>
      <ul>
        {items.map((it, i) => (
          <li key={i}>
            {it} <button onClick={() => removeItem(i)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <button onClick={() => addItem("kiwi")}>Añadir kiwi</button>
    </div>
  );
}
```

---

# 8. Lifting state up

```tsx
import React, { useState } from "react";

type ChildAProps = { count: number; onIncrement: () => void };
function ChildA({ count, onIncrement }: ChildAProps) {
  return (
    <div>
      <p>Child A: {count}</p>
      <button onClick={onIncrement}>Incrementar</button>
    </div>
  );
}

type ChildBProps = { count: number; onDecrement: () => void };
function ChildB({ count, onDecrement }: ChildBProps) {
  return (
    <div>
      <p>Child B: {count}</p>
      <button onClick={onDecrement}>Decrementar</button>
    </div>
  );
}

export function ParentWithLiftedState() {
  const [count, setCount] = useState<number>(0);

  return (
    <div>
      <ChildA count={count} onIncrement={() => setCount((c) => c + 1)} />
      <ChildB count={count} onDecrement={() => setCount((c) => c - 1)} />
    </div>
  );
}
```

---

# 9. Deriving state from props

```tsx
import React, { useMemo } from "react";

type Props = { items: number[] };

export function DerivedFromProps({ items }: Props) {
  const sum = useMemo(() => items.reduce((a, b) => a + b, 0), [items]);

  return <div>Suma: {sum}</div>;
}
```

---

# FIN
