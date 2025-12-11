# 📘 DOCUMENTACIÓN PROFESIONAL --- TIPADO DE COMPONENTES EN REACT + TYPESCRIPT

> Esta guía está pensada para personas que ya conocen React y TypeScript
> por separado,\
> pero se pierden al combinarlos. Aquí aprenderás a **tipar componentes
> como lo hace un React Developer profesional**.

------------------------------------------------------------------------

# ✅ 1. COMPONENTE MÁS BÁSICO CON PROPS

## 🧠 Idea

Un componente recibe datos → esos datos deben tiparse.

------------------------------------------------------------------------

### ✅ Ejemplo: Componente `Greeting`

``` tsx
type GreetingProps = {
  name: string;
};

export function Greeting({ name }: GreetingProps) {
  return <h1>Hola, {name}</h1>;
}
```

### ✅ Uso

``` tsx
<Greeting name="Pedro" />
```

❌ Error:

``` tsx
<Greeting name={123} /> // ERROR: se espera un string
```

------------------------------------------------------------------------

# ✅ 2. COMPONENTE CON `children`

## 🧠 Todo componente contenedor debería aceptar `children`

------------------------------------------------------------------------

``` tsx
type CardProps = {
  children: React.ReactNode;
};

export function Card({ children }: CardProps) {
  return <div className="card">{children}</div>;
}
```

### ✅ Uso

``` tsx
<Card>
  <h2>Título</h2>
  <p>Contenido</p>
</Card>
```

------------------------------------------------------------------------

# ✅ 3. COMPONENTES CON `useState` TIPADO

------------------------------------------------------------------------

### ✅ Estado número

``` tsx
const [count, setCount] = useState<number>(0);
```

------------------------------------------------------------------------

### ✅ Estado objeto

``` tsx
type User = {
  name: string;
  age: number;
};

const [user, setUser] = useState<User>({
  name: "",
  age: 0,
});
```

------------------------------------------------------------------------

# ✅ 4. COMPONENTE CON `{...props}` (ESTÁNDAR PROFESIONAL)

------------------------------------------------------------------------

## ✅ Botón reutilizable

``` tsx
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return <button {...props} />;
}
```

------------------------------------------------------------------------

### ✅ Botón con variante

``` tsx
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", ...props }: ButtonProps) {
  return (
    <button {...props} className={`btn-${variant}`} />
  );
}
```

------------------------------------------------------------------------

# ✅ 5. COMPONENTES CONTROLADOS (INPUTS)

------------------------------------------------------------------------

``` tsx
type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function Input({ value, onChange }: InputProps) {
  return <input value={value} onChange={onChange} />;
}
```

------------------------------------------------------------------------

# ✅ 6. TIPADO DE EVENTOS (MUY IMPORTANTE)

  Evento   Tipo
  -------- ---------------------------------------
  Input    `React.ChangeEvent<HTMLInputElement>`
  Click    `React.MouseEvent<HTMLButtonElement>`
  Submit   `React.FormEvent<HTMLFormElement>`

------------------------------------------------------------------------

### ✅ Ejemplo Submit

``` tsx
function Form() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return <form onSubmit={handleSubmit}></form>;
}
```

------------------------------------------------------------------------

# ✅ 7. COMPONENTES CON `useRef`

------------------------------------------------------------------------

### ✅ Ref a input

``` tsx
const inputRef = useRef<HTMLInputElement | null>(null);
```

------------------------------------------------------------------------

### ✅ Ref como variable

``` tsx
const counterRef = useRef<number>(0);
```

------------------------------------------------------------------------

# ✅ 8. COMPONENTES CON `forwardRef`

------------------------------------------------------------------------

``` tsx
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const FancyInput = forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <input ref={ref} {...props} />;
  }
);
```

------------------------------------------------------------------------

# ✅ 9. COMPONENTES CON `useImperativeHandle`

------------------------------------------------------------------------

``` tsx
type InputHandle = {
  focus: () => void;
  clear: () => void;
};

export const CustomInput = forwardRef<InputHandle>((_, ref) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) inputRef.current.value = "";
    },
  }));

  return <input ref={inputRef} />;
});
```

------------------------------------------------------------------------

# ✅ 10. COMPONENTES GENÉRICOS `<T>` (NIVEL PRO)

------------------------------------------------------------------------

``` tsx
type ListProps<T> = {
  items: T[];
  render: (item: T) => React.ReactNode;
};

export function List<T>({ items, render }: ListProps<T>) {
  return <ul>{items.map(render)}</ul>;
}
```

------------------------------------------------------------------------

### ✅ Uso

``` tsx
<List
  items={[1, 2, 3]}
  render={(n) => <li key={n}>{n}</li>}
/>
```

------------------------------------------------------------------------

# ✅ 11. TIPADO DE ESTILOS

------------------------------------------------------------------------

``` tsx
type BoxProps = {
  style?: React.CSSProperties;
};

export function Box({ style }: BoxProps) {
  return <div style={style} />;
}
```

------------------------------------------------------------------------

# ✅ 12. COMPONENTE COMO LIBRERÍA (PROFESIONAL REAL)

------------------------------------------------------------------------

``` tsx
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div>
      <div>{children}</div>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
}
```

------------------------------------------------------------------------

# ✅ 13. ERRORES TÍPICOS QUE DEBES EVITAR

❌ `props: any`\
❌ `useRef(null)` sin tipar\
❌ No usar `children`\
❌ No tipar eventos\
❌ No usar `forwardRef` cuando hay ref\
❌ Usar `useImperativeHandle` sin necesidad

------------------------------------------------------------------------

# ✅ 14. MAPA MENTAL FINAL

  Necesitas              Usa
  ---------------------- -----------------------
  Estado                 `useState<T>`
  DOM                    `useRef<HTMLElement>`
  Props HTML             `HTMLAttributes<T>`
  Exponer ref            `forwardRef`
  API por ref            `useImperativeHandle`
  Listas reutilizables   Genéricos `<T>`
  Pasar contenido        `children: ReactNode`

------------------------------------------------------------------------

# ✅ CONCLUSIÓN

Si sabes tipar correctamente:

✅ Componentes\
✅ Estados\
✅ Eventos\
✅ Refs\
✅ forwardRef\
✅ useImperativeHandle\
✅ Props HTML\
✅ children\
✅ Genéricos

👉 Ya tienes **nivel profesional real en React + TypeScript**.
