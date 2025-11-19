```js
/*
  Documentación: Clean Architecture y Patrón Container en React
  --------------------------------------------------------------
  Comentario inicial (explicación en forma de comentario):

  Este documento explica, paso a paso y con ejemplos comentados, cómo aplicar
  los principios de Clean Architecture y el patrón Container (Container/Presentational)
  dentro de una aplicación React. Está pensado para personas principiantes que
  quieren entender tanto la teoría como la práctica con ejemplos sencillos —un
  banco y un restaurante— implementados con código claro y comentarios en cada paso.

  Objetivos:
  - Entender la estructura y beneficios de Clean Architecture aplicada a frontend.
  - Conocer el patrón Container/Presentational y cuándo usarlo.
  - Ver ejemplos prácticos y comentados que puedas copiar y adaptar.
*/
```

# Documentación: Clean Architecture y Patrón Container en React

> **Nota:** Todo el contenido siguiente está pensado para un nivel inicial/medio,
> pero con explicaciones y decisiones que cumplen prácticas profesionales.

---

## Índice

1. ¿Qué es Clean Architecture? (visión general)
2. Capas y reglas (cómo estructurar un proyecto)
3. Ejemplo conceptual: Banco (transferencia simple)
4. Ejemplo concreto en código React (estructura de carpetas + snippets)
5. ¿Qué es el patrón Container/Presentational?
6. Ejemplo: Aplicación de restaurante — Container + Presentational
7. Buenas prácticas, testing y recomendaciones profesionales
8. Recursos y siguientes pasos

---

## 1) ¿Qué es Clean Architecture? (visión general)

Clean Architecture es una forma de organizar el código para mantenerlo:

- **Separado por responsabilidades** (cada módulo hace una cosa).
- **Independiente de frameworks y librerías específicas** (React, Express, etc.).
- **Testable**: las reglas de negocio se pueden probar sin UI ni bases de datos.
- **Escalable y fácil de mantener**: cambiar una capa no obliga a reescribir las demás.

La idea central es **invertir dependencias**: las capas externas conocen a las internas, pero las internas no deben depender de detalles de implementación externos.

### Capas habituales (de dentro hacia fuera)

1. **Entities / Domain**: entidades y reglas de negocio puras.
2. **Use Cases / Interactors**: orquestan la lógica de aplicación (ej.: "transferir dinero").
3. **Gateways / Repositories / Interfaces**: abstracciones que permiten acceder a datos.
4. **Frameworks & Drivers**: React components, HTTP, DB, UI, etc.

**Regla clave (Dependency Rule):** las dependencias apuntan hacia adentro.

---

## 2) Capas y reglas aplicadas a un proyecto React

### ¿Qué va en cada carpeta?

```
/src
  /domain       # Entidades y reglas puras
  /usecases     # Casos de uso que usan domain y repositorios
  /repositories # Interfaces (contratos) para persistencia/servicios
  /adapters     # Implementaciones concretas (API, localStorage)
  /ui           # React components (containers + presentational)
  /di           # Inyección de dependencias (montaje de app)
  /tests        # Tests unitarios/integración
```

- `domain` y `usecases` no deben importar nada de React ni del navegador.
- `adapters` implementan las interfaces definidas en `repositories`.
- `ui` (React) se limita a usar los casos de uso y adaptadores mediante la inyección.

---

## 3) Ejemplo conceptual: Banco — caso de uso "Transferir dinero"

**Dominio:** Entidades: `Account` (id, balance), reglas: "no permitir saldo negativo".

**Use case:** `transfer(fromAccountId, toAccountId, amount)`
- Valida fondos suficientes.
- Resta del origen y suma al destino.
- Persiste cambios a través de un `AccountRepository`.

**Repository (contrato):**
```js
// interface AccountRepository {
//   findById(accountId) => Promise<Account>
//   save(account) => Promise<void>
// }
```

**Adapter:** Implementación concreta (por ejemplo, `HttpAccountRepository` que hace fetch a una API).

**UI:** Un formulario React usa el use case `transfer` y muestra resultado/errores.

---

## 4) Ejemplo concreto en código (React) — Banco simplificado

> A continuación verás una implementación simplificada y comentada. No es un
> sistema bancario real (falta seguridad, autenticación, validación avanzada,
> concurrencia, logs, auditoría), pero ilustra cómo separar responsabilidades.

### Estructura de carpetas (ejemplo)

```
/src
  /domain
    account.js
  /usecases
    transferMoney.js
  /repositories
    accountRepository.js     // contrato (interfaz)
  /adapters
    inMemoryAccountRepo.js   // implementación para desarrollo / tests
  /ui
    /components
      TransferForm.js        // Presentational
      TransferContainer.js   // Container
  /di
    container.js             // monta dependencias
  index.js
```

### `domain/account.js` — Entidad con reglas de negocio

```js
// domain/account.js

/**
 * Entidad Account: lógica mínima dentro de la entidad.
 */
export function createAccount({ id, balance = 0 }) {
  let _id = id;
  let _balance = balance;

  return {
    getId: () => _id,
    getBalance: () => _balance,

    // Método que aplica la operación de débito con regla: "no saldo negativo".
    debit: (amount) => {
      if (amount <= 0) throw new Error('El monto debe ser positivo');
      if (_balance - amount < 0) throw new Error('Fondos insuficientes');
      _balance -= amount;
    },

    credit: (amount) => {
      if (amount <= 0) throw new Error('El monto debe ser positivo');
      _balance += amount;
    }
  };
}
```

### `repositories/accountRepository.js` — Contrato / interfaz

```js
// repositories/accountRepository.js

/**
 * Contrato: define la forma que debe respetar cualquier repositorio de cuentas.
 * En JS no hay interfaces nativas, así que lo documentamos.
 */
export const AccountRepository = {
  // findById(id): Promise<AccountDTO>
  // save(accountDTO): Promise<void>
};
```

### `adapters/inMemoryAccountRepo.js` — Implementación para desarrollo/tests

```js
// adapters/inMemoryAccountRepo.js

import { createAccount } from '../domain/account.js';

const db = new Map();

export function createInMemoryAccountRepo(initial = []) {
  // inicializa "DB" en memoria
  initial.forEach(a => db.set(a.id, { id: a.id, balance: a.balance }));

  return {
    async findById(id) {
      const raw = db.get(id);
      if (!raw) return null;
      // retornamos una entidad ligera (o DTO) — aquí devolvemos entidad
      return createAccount({ id: raw.id, balance: raw.balance });
    },

    async save(accountEntity) {
      // persistimos el balance de la entidad en la "db"
      db.set(accountEntity.getId(), { id: accountEntity.getId(), balance: accountEntity.getBalance() });
    }
  };
}
```

### `usecases/transferMoney.js` — Caso de uso

```js
// usecases/transferMoney.js

/**
 * Caso de uso: transferir dinero entre cuentas.
 * Recibe el repo por inyección (Dependency Injection). Esto evita acoplar
 * el caso de uso a detalles concretos (fetch, localStorage, etc.).
 */
export function createTransferMoney({ accountRepo }) {
  return async function transfer({ fromId, toId, amount }) {
    // 1. obtener entidades
    const from = await accountRepo.findById(fromId);
    const to = await accountRepo.findById(toId);

    if (!from) throw new Error('Cuenta origen no encontrada');
    if (!to) throw new Error('Cuenta destino no encontrada');

    // 2. aplicar reglas y mutaciones en entidades
    from.debit(amount); // puede lanzar error si fondos insuficientes
    to.credit(amount);

    // 3. persistir cambios via repo
    await accountRepo.save(from);
    await accountRepo.save(to);

    // 4. devolver resultado (puede ser solo un success o detalles)
    return { success: true };
  };
}
```

### `ui/components/TransferForm.js` — Presentational (UI pura)

```jsx
// ui/components/TransferForm.js
import React from 'react';

// Presentational component: solo se preocupa por renderizar y recibir props.
export default function TransferForm({ onSubmit, loading, error }) {
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [amount, setAmount] = React.useState('');

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ fromId: from, toId: to, amount: Number(amount) });
      }}
    >
      <div>
        <label>Desde (id):</label>
        <input value={from} onChange={e => setFrom(e.target.value)} />
      </div>
      <div>
        <label>Hacia (id):</label>
        <input value={to} onChange={e => setTo(e.target.value)} />
      </div>
      <div>
        <label>Monto:</label>
        <input value={amount} onChange={e => setAmount(e.target.value)} />
      </div>
      <button type="submit" disabled={loading}>Enviar</button>
      {error && <div role="alert">{String(error)}</div>}
    </form>
  );
}
```

### `ui/components/TransferContainer.js` — Container (lógica y estado)

```jsx
// ui/components/TransferContainer.js
import React from 'react';
import TransferForm from './TransferForm';

/**
 * Container: se encarga de inyectar dependencias, manejar estado y llamar al
 * caso de uso. Mantén la UI (TransferForm) libre de lógica de negocio.
 */
export default function TransferContainer({ transferUseCase }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  async function handleSubmit({ fromId, toId, amount }) {
    setLoading(true);
    setError(null);
    try {
      await transferUseCase({ fromId, toId, amount });
      // aquí podrías mostrar un toast, resetear formulario, etc.
    } catch (err) {
      setError(err.message || 'Error en la transferencia');
    } finally {
      setLoading(false);
    }
  }

  return <TransferForm onSubmit={handleSubmit} loading={loading} error={error} />;
}
```

### `di/container.js` — Montaje (inyección)

```js
// di/container.js
import { createInMemoryAccountRepo } from '../adapters/inMemoryAccountRepo.js';
import { createTransferMoney } from '../usecases/transferMoney.js';

export function createContainer() {
  const accountRepo = createInMemoryAccountRepo([
    { id: 'A', balance: 100 },
    { id: 'B', balance: 50 }
  ]);

  const transferMoney = createTransferMoney({ accountRepo });

  return { accountRepo, transferMoney };
}
```

### `index.js` — Uso en la app

```jsx
// index.js
import React from 'react';
import { createContainer } from './di/container.js';
import TransferContainer from './ui/components/TransferContainer';

const { transferMoney } = createContainer();

function App() {
  return (
    <div>
      <h1>Banco (demo)</h1>
      <TransferContainer transferUseCase={transferMoney} />
    </div>
  );
}

export default App;
```

**Comentarios finales del ejemplo de banco:**
- `usecases` y `domain` no importan React ni fetch; están puros.
- `adapters` implementan la dependencia (aquí in-memory, en prod sería HTTP/DB).
- Los containers inyectan los casos de uso en componentes de UI.

---

## 5) ¿Qué es el patrón Container/Presentational?

Es una forma de separar la **lógica** (containers) de la **presentación** (presentational components):

- **Container components**: manejan estado, llamadas a APIs, efectos, inyección de casos de uso.
- **Presentational components**: son puros (funcionales) y reciben `props` para renderizar.

Beneficios:
- Facilita testing (presentational son fáciles de testear con snapshots / assertions).
- Reutilización de UI en distintos contextos.
- Claridad en responsabilidades.

---

## 6) Ejemplo: Restaurante — Ordenar un plato (Container + Presentational)

### Concepto

- Usuario ve un menú y hace "Agregar al pedido".
- Container maneja estado del pedido y llama a `addToOrder` (use case).
- Presentational muestra lista de platos y botón "Agregar".

### Código (simplificado)

```jsx
// domain/menuItem.js
export function createMenuItem({ id, name, price }) {
  return { id, name, price };
}

// usecases/addToOrder.js
export function createAddToOrder({ orderRepo }) {
  return async function addToOrder({ itemId, qty = 1 }) {
    // lógica mínima: buscar item, agregar a pedido
    // (simplificamos por brevedad).
    const order = await orderRepo.getCurrentOrder();
    order.addItem(itemId, qty);
    await orderRepo.save(order);
    return { success: true };
  };
}

// ui/components/MenuList.js (presentational)
import React from 'react';
export default function MenuList({ items, onAdd }) {
  return (
    <ul>
      {items.map(i => (
        <li key={i.id}>
          {i.name} - {i.price} <button onClick={() => onAdd(i.id)}>Agregar</button>
        </li>
      ))}
    </ul>
  );
}

// ui/components/MenuContainer.js (container)
import React from 'react';
import MenuList from './MenuList';

export default function MenuContainer({ menuItems, addToOrderUseCase }) {
  const [error, setError] = React.useState(null);

  async function handleAdd(itemId) {
    try {
      await addToOrderUseCase({ itemId, qty: 1 });
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div>
      {error && <div>{error}</div>}
      <MenuList items={menuItems} onAdd={handleAdd} />
    </div>
  );
}
```

**Comentarios del ejemplo del restaurante:**
- `MenuList` no conoce la lógica de cómo se guarda el pedido.
- `MenuContainer` se encarga de invocar el caso de uso y manejar errores/estado.

---

## 7) Buenas prácticas, testing y recomendaciones profesionales

- **No mezcles lógica de negocio con UI.** Si necesitas lógica compleja, muévela a `usecases`.
- **Inyecta dependencias** (repos, servicios) en containers o en un `di/container`.
- **Mockea adapters** en tests: facilita pruebas unitarias rápidas.
- **Prueba los casos de uso**: son los más críticos. Usa Jest, mocha o vitest.
- **Presentational components**: prueba con render-tests (React Testing Library) y snapshots cuando proceda.
- **Evita efectos secundarios en entidades**. Las entidades deben ser puras cuando sea posible.

---

## 8) Recursos y siguientes pasos

- Leer sobre "Uncle Bob – Clean Architecture" (artículos y videos) para la teoría.
- Practicar extrayendo lógica desde componentes grandes hacia `usecases`.
- Añadir una capa de validación y manejo de errores estandarizado (DTOs, Result types).
- Evolucionar a TypeScript para contratos más seguros (interfaces reales).

---

### Fin de la documentación

Si quieres, puedo:
- Transformar los snippets a TypeScript.
- Generar tests de ejemplo para los `usecases` y `presentational components`.
- Hacer una versión mínima runnable (Vite/CRA) con estos ejemplos listos para ejecutar.

Indícame cuál prefieres y lo preparo.

