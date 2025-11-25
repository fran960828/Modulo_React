✅ Ejercicio 1 — Crear un componente estático
Conceptos: componente estático, JSX, mayúscula inicial
Objetivo: crear un componente simple sin props ni lógica.
👉 Crea un componente llamado WelcomeBox que muestre un saludo simple en un <div>.

✅ Ejercicio 2 — Usar un componente dentro de otro
Conceptos: estructura de árbol, <Componente/>
Objetivo: importar y usar un componente.
👉 Inserta el componente WelcomeBox dentro de App.

✅ Ejercicio 3 — Renderizar la app
Conceptos: createRoot().render()
Objetivo: montar tu aplicación en #root.
👉 Configura main.tsx para renderizar tu componente App.

🟩 Nivel 2 — Dinamismo básico
✅ Ejercicio 4 — Contenido dinámico
Conceptos: llaves { }, interpolación
Objetivo: mostrar variables dentro del JSX.
👉 Crea un componente UserInfo que reciba por ahora un nombre en una variable interna y lo muestre.

✅ Ejercicio 5 — Imagen dinámica
Conceptos: import estático de imágenes
Objetivo: importar una imagen desde /src/assets.
👉 Crea un componente Avatar que muestre una imagen importada:
import avatarImg from "../assets/miFoto.png"
🟨 Nivel 3 — Props y reutilización

✅ Ejercicio 6 — Props básicas
Conceptos: interfaces, props, reusabilidad
Objetivo: crear un componente reutilizable.
👉 Crea AlertMessage que reciba:
un message: string
un type: "success" | "error"
Muestra estilos diferentes según el tipo.

✅ Ejercicio 7 — Props + eventos
Conceptos: onClick, enviar funciones como props
Objetivo: permitir que el padre controle acciones.
👉 Crea un componente ActionButton que reciba por props:
label: string
onAction: () => void
Y úsalo desde App.

✅ Ejercicio 8 — Children
Conceptos: children: React.ReactNode
Objetivo: encapsular estructura visual con contenido variable.
👉 Implementa CardContainer que envuelva contenido arbitrario:
<CardContainer>

  <p>Un texto dentro de la tarjeta</p>
</CardContainer>

🟧 Nivel 4 — Interactividad y estado
✅ Ejercicio 9 — useState básico
Conceptos: estado, setter
Objetivo: cambiar valores en la interfaz.
👉 Crea un contador simple: CounterBasic.

✅ Ejercicio 10 — Eventos internos + estado
Conceptos: funciones dentro del componente
Objetivo: controlar acciones internas.
👉 Crea un componente ToggleMessage que muestre un texto solo cuando un booleano sea true.
Incluye un botón para alternar el estado.

✅ Ejercicio 11 — Arrow functions con parámetros
Conceptos: pasar argumentos desde eventos
Objetivo: aplicar comportamientos distintos por botón.
👉 Crea un componente MultiActionButtons con 3 botones:
"Rojo"
"Verde"
"Azul"
Cada uno debe ejecutar:
() => handleSelectColor("rojo")
El nombre del color debe mostrarse en pantalla.

🟥 Nivel 5 — Lógica condicional y estilos
✅ Ejercicio 12 — Condicional ternario para mostrar/ocultar
Conceptos: ternario, renderización condicional
Objetivo: mostrar elementos solo si cumple condición.
👉 Crea un componente LoginBox que:
tenga un botón "Mostrar/ocultar login"
oculte o muestre un formulario básico dependiendo del estado

✅ Ejercicio 13 — Ternario para cambiar clases
Conceptos: estilos dinámicos
Objetivo: aplicar clases diferentes en función del estado.
👉 Crea SelectableBox que:
muestre un cuadrado
al hacer click cambie su className entre "selected" y "unselected"
Crea y usa un .css para este componente.

🟪 Nivel 6 — Integración de conceptos (profesional)
✅ Ejercicio 14 — Componente completo con props, children y eventos
Objetivos combinados:
props
children
eventos
estilos
estado
ternarios
👉 Crea un componente llamado Modal con:
prop isOpen: boolean
prop onClose: () => void
children para el contenido interno
un fondo semitransparente que se muestre solo cuando isOpen es true
CSS modular importado: Modal.css
El botón de cerrar debe llamarse:
<button onClick={onClose}>Cerrar</button>
¿Qué debe practicar?
✔ Render condicional
✔ Control del padre (lifting state)
✔ Gestión de children
✔ CSS por componente

✅ Ejercicio 15 — Lista dinámica con imágenes y eventos
Conceptos profesionales:
renderizado de listas
props complejos
imágenes dinámicas
eventos con parámetros
selección de elemento
estilos dinámicos
separación de componentes

👉 Crea un componente ProductList que reciba products: Product[]:
interface Product {
id: number;
name: string;
price: number;
image: string; // ruta importada del asset
}

Debe mostrar:
la imagen del producto
su nombre
su precio
un botón “Seleccionar”
Cuando se haga click en seleccionar:
debe marcarse visualmente el producto seleccionado (class dinámica)
debe llamar a onSelect(product: Product) pasada por props

🟫 Nivel 7 — Ejercicio final profesional
🏆 Ejercicio 16 — Mini aplicación completa
Este es el ejercicio final para un manejo fluido y profesional.
👉 Crea una app llamada "TaskBoard", con:

1. Componentes necesarios
   TaskBoard (contenedor principal)
   TaskItem (representa cada tarea)
   TaskForm (para añadir nuevas tareas)
   Modal (reutilizable para editar una tarea)
   Button (reutilizable)
2. Funcionalidades
   Añadir tareas
   Listar tareas dinámicamente
   Cada tarea debe tener:
   título
   descripción
   imagen opcional importada dinámicamente
   Poder hacer click en una tarea para abrir un modal de edición
   Cambiar el estilo de la tarea seleccionada con un ternario de className
   Botones con eventos y funciones vía props
   Estilos CSS separados por componente
3. Conceptos integrados
   ✔ Creación de componentes
   ✔ Uso de props
   ✔ Uso de children
   ✔ Eventos simples y con parámetros
   ✔ Estado global del componente padre
   ✔ Renderizado condicional profesional
   ✔ Importación dinámica de imágenes
   ✔ CSS modular por componente
   ✔ Lógica de listas
   ✔ Buenas prácticas con TypeScript
