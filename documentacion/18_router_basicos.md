¡Hola! Qué buena iniciativa. Dominar **React Router** es el paso definitivo para pasar de crear "páginas" a crear "aplicaciones web" reales (SPAs).

Como experto en React y TypeScript, he preparado esta guía estructurada para que entiendas no solo el _cómo_, sino el _porqué_ de cada herramienta.

---

## 1. Instalación

Para empezar a usar el enrutamiento en tu proyecto, necesitamos la librería específica para la web.

```bash
npm install react-router-dom

```

---

## 2. Configuración Principal: `createBrowserRouter` y `RouterProvider`

> **Concepto:** `createBrowserRouter` es la forma recomendada de configurar rutas en las versiones modernas (v6.4+). Permite definir una lista de objetos donde cada uno tiene un `path` (la URL) y un `element` (el componente TSX). `RouterProvider` es el componente que "inyecta" esa configuración en tu aplicación.

```tsx
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

// 1. Definimos las rutas en un array de objetos
// path: la URL que el usuario ve
// element: el componente que React debe montar
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

export default function App() {
  // 2. Pasamos la configuración al Provider para que esté disponible en toda la app
  return <RouterProvider router={router} />;
}
```

---

## 3. Alternativa: `createRoutesFromElements` y `Route`

> **Concepto:** Si prefieres una sintaxis más visual similar a HTML (JSX) en lugar de objetos, puedes usar esta alternativa. Hace exactamente lo mismo que el ejemplo anterior.

```tsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Usamos la función para convertir elementos JSX en objetos de ruta
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="about" element={<About />} />
    </Route>
  )
);
```

---

## 4. Navegación: `Link` y `NavLink`

> **Concepto:** En React, nunca uses `<a href="...">`. Eso recargaría toda la página y perderías el estado de la aplicación. `Link` intercepta el click y solo cambia el contenido necesario. `NavLink` es una versión especial que sabe si la ruta está "activa" para añadirle clases de CSS automáticamente.

```tsx
import { Link, NavLink } from "react-router-dom";

export function Navbar() {
  return (
    <nav>
      {/* Link simple para navegación básica */}
      <Link to="/">Inicio</Link>

      {/* NavLink: isActive es una propiedad que nos da React Router */}
      <NavLink
        to="/about"
        style={({ isActive }) => ({ color: isActive ? "red" : "black" })}
      >
        Sobre nosotros
      </NavLink>
    </nav>
  );
}
```

---

## 5. Layouts y Rutas Anidadas: `Outlet`

> **Concepto:** A veces tienes elementos que se repiten (como un Sidebar o Header). En lugar de copiarlos en cada página, creas un componente "Layout". El `Outlet` es el lugar exacto donde se renderizarán los "hijos" de esa ruta.

```tsx
import { Outlet } from "react-router-dom";

export function MainLayout() {
  return (
    <div className="layout">
      <header>Mi App Profesional</header>
      <main>
        {/* Aquí aparecerán Home, About, etc. dependiendo de la URL */}
        <Outlet />
      </main>
      <footer>© 2024</footer>
    </div>
  );
}
```

---

## 6. Manejo de Errores: `errorElement`

> **Concepto:** Si un usuario entra en una ruta que no existe o un componente falla, React Router mostrará una pantalla en blanco o un error feo. `errorElement` te permite capturar eso y mostrar tu propio componente de error.

```tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />, // Si algo falla aquí o en sus hijos, se muestra esto
    children: [{ index: true, element: <Home /> }],
  },
]);
```

---

## 7. Navegación Programática: `useNavigate`

> **Concepto:** Úsalo cuando necesites cambiar de página tras una acción lógica (por ejemplo, después de que un usuario haga login o envíe un formulario), no por un simple click en un enlace.

```tsx
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // ... lógica de validación
    navigate("/dashboard"); // Redirigimos al usuario dinámicamente
  };

  return <button onClick={handleSubmit}>Entrar</button>;
}
```

---

## 8. Rutas Dinámicas y Parámetros: `:` y `useParams`

> **Concepto:** El `:` en un path indica que esa parte es variable (un ID, un nombre). `useParams` es el hook que nos permite leer ese valor dentro del componente.

```tsx
// En la configuración de rutas:
// { path: "/user/:id", element: <UserProfile /> }

import { useParams } from "react-router-dom";

export function UserProfile() {
  const { id } = useParams<{ id: string }>(); // TypeScript: indicamos que esperamos un id string

  return <div>Viendo el perfil del usuario: {id}</div>;
}
```

---

## 9. Rutas Absolutas vs Relativas y `index`

> **Concepto:** > - **Absoluta:** Empieza con `/` y va desde la raíz.
>
> - **Relativa:** No lleva `/` y se añade a la ruta del padre.
> - **index:** Indica que este es el componente por defecto cuando estamos en la ruta del padre.

```tsx
const router = createBrowserRouter([
  {
    path: "/dashboard", // Ruta absoluta
    element: <DashboardLayout />,
    children: [
      {
        index: true, // Esto es "/dashboard" (la ruta por defecto del padre)
        element: <DashboardStats />,
      },
      {
        path: "settings", // Ruta relativa: esto es "/dashboard/settings"
        element: <Settings />,
      },
    ],
  },
]);

// Uso de 'relative' en Link
// Si estamos en /dashboard/settings:
// <Link to=".." relative="path"> Iría a /dashboard
```

---

## 10. Ejemplo Completo Profesional (TypeScript)

Aquí unificamos todo lo aprendido en un solo archivo de estructura clara.

```tsx
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
  useParams,
} from "react-router-dom";

// --- COMPONENTES ---

const Layout = () => (
  <div>
    <nav>
      <Link to="/">Home</Link> | <Link to="/blog">Blog</Link>
    </nav>
    <hr />
    <Outlet /> {/* Aquí se renderizan los hijos */}
  </div>
);

const Post = () => {
  const { slug } = useParams();
  return <h1>Post: {slug}</h1>;
};

// --- CONFIGURACIÓN ---

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>404 - Not Found</h1>,
    children: [
      {
        index: true, // Se muestra en "/"
        element: <h1>Bienvenido a la Home</h1>,
      },
      {
        path: "blog", // Relativa a "/" -> "/blog"
        element: <Outlet />,
        children: [
          { index: true, element: <h2>Lista de Posts</h2> },
          { path: ":slug", element: <Post /> }, // Dinámica: "/blog/mi-post"
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
```

¿Te gustaría que profundizáramos en cómo proteger estas rutas (Private Routes) para que solo usuarios logueados puedan entrar?
