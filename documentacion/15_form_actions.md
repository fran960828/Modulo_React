## 1. Form Actions y Validación Manual

En React 19, el atributo `action` de un formulario acepta una función. Lo revolucionario es que React **gestiona automáticamente el envío**, ejecutando `event.preventDefault()` por nosotros. La función recibe un objeto `FormData` con todos los valores de los inputs que tengan el atributo `name`.

```typescript
// Explicación:
// En React 19, 'action' permite funciones asíncronas.
// Recibe 'formData' que contiene los valores de los inputs.
// No hace falta 'useState' para cada input, lo que mejora el rendimiento.

import React from "react";

export const BasicForm = () => {
  // Función que procesará el formulario
  const handleAction = async (formData: FormData) => {
    // Obtenemos los valores usando el atributo 'name' del input
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Validación manual simple
    if (!email.includes("@")) {
      alert("Email no válido");
      return;
    }

    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    console.log("Enviando datos:", { email, password });
    // Aquí iría la llamada a tu API
  };

  return (
    <form action={handleAction}>
      <input name="email" type="email" placeholder="Tu correo" required />
      <input
        name="password"
        type="password"
        placeholder="Tu contraseña"
        required
      />
      <button type="submit">Registrar</button>
    </form>
  );
};
```

---

## 2. useActionState: Gestión de Estado y Errores

El hook `useActionState` es el sucesor de `useFormState`. Permite manejar el estado del formulario (mensajes de éxito, errores, o datos previos) de forma integrada con el Action.

```typescript
// Explicación:
// useActionState recibe la función del action y un estado inicial.
// Retorna: [estadoActual, disparadorAccion, estaPendiente].
// Usamos 'defaultValue' en los inputs para que, si hay un error, el usuario no pierda lo que escribió.

import { useActionState } from "react";

// Definimos el tipo de respuesta de nuestra lógica de negocio
type FormState = {
  success: boolean;
  message: string;
  errors?: { email?: string; password?: string };
  inputs?: { email: string }; // Para persistir datos
};

async function signUpAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get("email") as string;

  // Simulación de validación
  if (!email.includes("@")) {
    return {
      success: false,
      message: "Error de validación",
      errors: { email: "Email inválido" },
      inputs: { email }, // Devolvemos el input para persistirlo
    };
  }

  return { success: true, message: "¡Registro exitoso!", inputs: { email } };
}

export const StateForm = () => {
  // useActionState(acción, estadoInicial)
  const [state, formAction, isPending] = useActionState(signUpAction, {
    success: false,
    message: "",
  });

  return (
    <form action={formAction}>
      <input
        name="email"
        // Si hay error, mantenemos el valor que el usuario escribió
        defaultValue={state.inputs?.email}
        placeholder="Email"
      />
      {state.errors?.email && (
        <p style={{ color: "red" }}>{state.errors.email}</p>
      )}

      <button disabled={isPending}>
        {isPending ? "Enviando..." : "Enviar"}
      </button>

      {state.message && <p>{state.message}</p>}
    </form>
  );
};
```

---

## 3. useFormStatus y Múltiples Acciones (formAction)

`useFormStatus` permite a los componentes hijos conocer si el formulario padre se está enviando. Además, podemos usar `formAction` en botones específicos para ejecutar diferentes lógicas dentro del mismo `<form>`.

```typescript
// Explicación:
// useFormStatus solo funciona si se llama DESDE UN COMPONENTE DENTRO del <form>.
// formAction en un botón permite que ese botón ignore el 'action' principal del formulario.

import { useFormStatus } from "react-dom";

// Componente separado para el botón para poder usar useFormStatus
const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Procesando..." : label}
    </button>
  );
};

export const MultiActionForm = () => {
  const handleSave = async (formData: FormData) => {
    console.log("Guardando borrador...");
  };

  const handlePublish = async (formData: FormData) => {
    console.log("Publicando definitivamente...");
  };

  return (
    <form action={handleSave}>
      {" "}
      {/* Acción por defecto */}
      <input name="title" placeholder="Título del post" />
      {/* Este botón ejecuta la acción por defecto (handleSave) */}
      <SubmitButton label="Guardar Borrador" />
      {/* Este botón ejecuta una acción distinta gracias a formAction */}
      <button formAction={handlePublish}>Publicar Ahora</button>
    </form>
  );
};
```

---

## 4. useOptimistic: Interfaz Instantánea

`useOptimistic` permite actualizar la interfaz asumiendo que la petición al servidor será exitosa, revirtiendo el cambio automáticamente si falla.

```typescript
// Explicación:
// Ideal para "Likes" o "Añadir a lista".
// useOptimistic(estadoReal, (estadoActual, nuevoValor) => nuevoEstadoOptimista)

import { useOptimistic, useState } from "react";

type Message = { text: string; id: number; sending?: boolean };

export const OptimisticChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hola!", id: 1 },
  ]);

  // Hook para la actualización optimista
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessageText: string) => [
      ...state,
      { text: newMessageText, id: Date.now(), sending: true }, // Marcamos como 'enviando'
    ]
  );

  const sendAction = async (formData: FormData) => {
    const messageText = formData.get("message") as string;

    // 1. Actualizamos la UI instantáneamente
    addOptimisticMessage(messageText);

    // 2. Simulamos llamada al servidor
    await new Promise((res) => setTimeout(res, 2000));

    // 3. Actualizamos el estado real (esto reemplazará al optimista)
    setMessages((prev) => [...prev, { text: messageText, id: Date.now() }]);
  };

  return (
    <div>
      {optimisticMessages.map((m, i) => (
        <div key={i}>
          {m.text} {m.sending && <small>(Enviando...)</small>}
        </div>
      ))}

      <form action={sendAction}>
        <input name="message" placeholder="Escribe un mensaje" required />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};
```

---

### Resumen profesional para tu flujo de trabajo:

1. **Usa `action**`para simplificar la lógica de envío y evitar`preventDefault`.
2. **Usa `useActionState**` cuando necesites manejar errores de validación del servidor y mantener los datos en los inputs.
3. **Usa `useFormStatus**` para crear componentes de botones reutilizables que reaccionen al estado de carga.
4. **Usa `formAction**` en botones si tu formulario tiene más de una operación posible (ej: Guardar vs. Publicar).
5. **Usa `useOptimistic**` para aplicaciones que necesiten sentirse extremadamente rápidas (chats, redes sociales).

¿Te gustaría que profundicemos en cómo integrar estas herramientas con una librería de validación como **Zod** para hacer el tipado aún más robusto?
