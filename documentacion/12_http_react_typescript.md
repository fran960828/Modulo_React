# Documentación básica y profesional de HTTP Requests en React con TypeScript

## Introducción general (comentario explicativo)

```ts
/**
 * Este documento explica, paso a paso y con enfoque profesional,
 * cómo realizar peticiones HTTP en React utilizando TypeScript.
 *
 * Está dirigido a personas principiantes, por lo que:
 * - Se explican los conceptos desde la base.
 * - Cada ejemplo incluye comentarios detallados.
 * - Se utilizan buenas prácticas comunes en entornos profesionales.
 *
 * Se cubrirán los siguientes temas:
 * - Peticiones HTTP con fetch (GET, PUT, DELETE)
 * - Uso de useEffect
 * - Uso de then / async-await
 * - Manejo de errores con try/catch
 * - Manejo de estados para datos, carga y errores
 */
```

---

## Conceptos previos necesarios

Antes de ver los ejemplos, es importante entender:

- **fetch**: API nativa del navegador para realizar peticiones HTTP.
- **useEffect**: Hook de React que permite ejecutar efectos secundarios (como llamadas a APIs).
- **useState**: Hook que permite manejar estados dentro de un componente.
- **TypeScript**: Permite tipar datos para mayor seguridad y mantenibilidad.
- **HTTP Methods**:
  - GET: Obtener información
  - PUT: Actualizar información
  - DELETE: Eliminar información

---

## 1. Petición HTTP GET usando fetch con `.then()` dentro de `useEffect`

### Explicación

Este enfoque es común en proyectos legacy o cuando se prefiere una sintaxis basada en promesas explícitas.

Características:

- Se ejecuta una vez al montar el componente.
- Se usa `.then()` para procesar la respuesta.
- No utiliza `async/await`.

---

### Ejemplo práctico

```tsx
import { useEffect, useState } from "react";

/**
 * Interfaz que define la estructura de los datos
 * que esperamos recibir de la API.
 */
interface User {
  id: number;
  name: string;
  email: string;
}

const UsersWithThen = () => {
  // Estado para almacenar los datos obtenidos
  const [users, setUsers] = useState<User[]>([]);

  // Estado para indicar si los datos están cargando
  const [loading, setLoading] = useState<boolean>(true);

  // Estado para manejar errores
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Se inicia la petición HTTP
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // Validación básica de la respuesta
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios");
        }
        return response.json();
      })
      .then((data: User[]) => {
        // Se almacenan los datos en el estado
        setUsers(data);
        setLoading(false);
      })
      .catch((err: Error) => {
        // Captura de errores
        setError(err.message);
        setLoading(false);
      });
  }, []); // Array vacío: se ejecuta solo una vez

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UsersWithThen;
```

---

## 2. Petición HTTP GET usando `async/await` dentro de `useEffect`

### Explicación

Este es el enfoque más utilizado en proyectos modernos.

Ventajas:

- Código más legible.
- Manejo de errores más claro.
- Mejor mantenibilidad.

---

### Ejemplo práctico

```tsx
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
}

const PostsWithAsyncAwait = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Definimos una función async dentro del useEffect
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error("Error al obtener los posts");
        }

        const data: Post[] = await response.json();
        setPosts(data);
      } catch (err) {
        // Manejo de errores
        if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        // Se ejecuta siempre, haya error o no
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default PostsWithAsyncAwait;
```

---

## 3. Manejo profesional de errores con `try` y `catch`

### Explicación

- `try`: Envuelve el código que puede fallar.
- `catch`: Captura errores de red, parseo o lógica.
- `finally`: Se ejecuta siempre (ideal para cerrar loaders).

Esto es **imprescindible** en producción.

---

## 4. Uso de tres estados: datos, carga y errores

### Explicación conceptual

En aplicaciones profesionales siempre se manejan estos tres estados:

| Estado  | Propósito                         |
| ------- | --------------------------------- |
| data    | Almacena la información de la API |
| loading | Controla la UI mientras se carga  |
| error   | Muestra mensajes de error         |

Este patrón mejora:

- UX
- Depuración
- Escalabilidad

---

## 5. Petición HTTP con método PUT

### Explicación

- PUT se usa para **actualizar** un recurso existente.
- Se envía información en el `body`.
- Se debe indicar el `Content-Type`.

---

### Ejemplo práctico

```tsx
const updateUser = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Nombre actualizado",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }

    const updatedUser = await response.json();
    console.log("Usuario actualizado:", updatedUser);
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

## 6. Petición HTTP con método DELETE

### Explicación

- DELETE elimina un recurso.
- Normalmente no devuelve contenido.
- Se debe validar la respuesta.

---

### Ejemplo práctico

```tsx
const deleteUser = async () => {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/1",
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar el usuario");
    }

    console.log("Usuario eliminado correctamente");
  } catch (error) {
    console.error("Error:", error);
  }
};
```

---

## Conclusión

Esta documentación cubre los fundamentos necesarios para trabajar de forma profesional con peticiones HTTP en React + TypeScript:

- Uso correcto de `useEffect`
- Manejo de estados críticos
- Manejo de errores robusto
- Uso de métodos HTTP más comunes

Este conocimiento es base para trabajar con:

- APIs REST
- Servicios backend
- Arquitecturas frontend escalables
