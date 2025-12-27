# 🌐 03 – API con CRUD

Este proyecto corresponde a la **tercera etapa** del repositorio **API Guide Express**.  
El objetivo es **implementar un CRUD completo**, utilizando **Node.js y Express**, trabajando con **datos en memoria**, sin base de datos.

En esta etapa la API:
- Implementa operaciones CRUD completas
- Maneja datos almacenados en un array
- Utiliza distintos métodos HTTP
- Usa parámetros dinámicos para identificar recursos
- Devuelve respuestas con status codes básicos

---

## 🧠 ¿Qué es un CRUD?

CRUD representa las cuatro operaciones básicas que se pueden realizar sobre datos:

- **Create** → Crear datos (POST)
- **Read** → Leer datos (GET)
- **Update** → Actualizar datos (PUT)
- **Delete** → Eliminar datos (DELETE)

Estas operaciones son la base de cualquier API que gestione información.

---

## 🧠 Conceptos que se practican
- CRUD
- Métodos HTTP (GET, POST, PUT, DELETE)
- Parámetros de ruta (`req.params`)
- Cuerpo de la petición (`req.body`)
- Status codes básicos
- Manejo de datos en memoria
- Respuestas en formato JSON

---

## 🚀 Configuración inicial

La configuración inicial es la misma que en los proyectos anteriores:

1. Inicializar el proyecto con npm
2. Instalar Express
3. Crear el archivo `index.js`
4. Configurar ES Modules (`"type": "module"`)
5. Importar express en `index.js`
6. Inicializar el servidor
7. Habilitar middleware para leer JSON
8. Definir los endpoints CRUD
9. Iniciar el servidor con `.listen()`

---

## 📦 Almacenamiento en memoria

Para simular una base de datos, se utiliza un array de objetos:

```js
let usuarios = [
  { id: 1, nombre: "Juan", email: "juan@email.com" },
  { id: 2, nombre: "Ana", email: "ana@email.com" }
];
```

⚠️ Al reiniciar el servidor, el array vuelve a su estado inicial.

---

## 📡 Endpoints disponibles

### 🔹 GET /usuarios

Devuelve la lista completa de usuarios.

```js
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});
```

Cuando no se define explícitamente un status code, Express responde por defecto con 200 OK.

### 🔹 GET /usuarios/:id

Devuelve un usuario específico según su ID.

```js
app.get("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const usuario = usuarios.find(elemento => elemento.id === id);

  if (!usuario) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  res.json(usuario);
});
```

Detalle del codigo anterior por fragmentos:

```js
app.get("/usuarios/:id", (req, res) => {
```
- `app.get` define un endpoint **HTTP GET**
- `/usuarios/:id` ruta dinamica
- `(req, res)` callback que se ejecuta cuando alguien llama a esa ruta

Conversion y asignación de valor a variable:

```js
const id = Number(req.params.id);
```

El parámetro `:id` forma parte de la URL y se accede mediante `req.params.id`.  
Dado que Express lo recibe como string, se convierte a número para poder compararlo correctamente.

Metodo find():
Se utiliza para recorrer un array y devolver el primer elemento que cumpla con la condición definida.
Si no encuentra coincidencias, devuelve `undefined`.

Estructura con llaves: 

```js
array.find(elemento => {
  return elemento.clave === 1;
  });
```

Estructura sin llaves:

```js
array.find(elemento => elemento.clave === 1);
```

Ejemplo usado en código: 

```js
const usuario = usuarios.find(elemento => elemento.id === id);
```

Método `.status()`:

Se utiliza para **establecer internamente el código de estado HTTP** que será enviado en la respuesta.
Este método **no envía la respuesta por sí solo**; debe combinarse con métodos como `.json()`,`.send()` o `.end()`, que son los encargados de enviar y finalizar la respuesta.

```js
return res.status(404).json({ mensaje: "Usuario no encontrado" });
```
El nombre del objeto (res) puede variar, pero siempre representa el objeto de respuesta de Express.

Códigos HTTP comúnmente utilizados en APIs:

- **200 OK** → solicitud exitosa
- **201 Created** → recurso creado correctamente
- **400 Bad Request** → datos inválidos enviados por el cliente
- **401 Unauthorized** → usuario no autenticado
- **403 Forbidden** → usuario sin permisos
- **404 Not Found** → recurso no encontrado
- **500 Internal Server Error** → error interno del servidor

Una API no necesita implementar todos los códigos HTTP, sino únicamente aquellos que representen correctamente el resultado de cada operación.

### 🔹 POST /usuarios

Crea un nuevo usuario y lo almacena en memoria.
Antes de definir este endpoint se debe habilitar el middleware:

```js
app.use(express.json());
```

Definición del endpoint:

```js
app.post("/usuarios", (req, res) => {
  const { nombre, email } = req.body;

  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    email
  };

  usuarios.push(nuevoUsuario);

  return res.status(201).json({
    mensaje: "Usuario creado",
    usuario: nuevoUsuario
  });
});
```

Detalle del codigo anterior por fragmentos:

```js
app.post("/usuarios", (req, res) => {
```
- `app.post` define un endpoint **HTTP POST**
- `/usuarios` ruta
- `(req, res)` callback que se ejecuta cuando alguien llama a esa ruta

Asignación de valores a variables:

```js
const { nombre, email } = req.body;
```
Usando destructuring de objetos.
Esto evita que se manden datos clave-valor adicionales que puedan comprometer la seguridad de la API

Creacion de nuevo objeto con datos recibidos:

```js
const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    email
  };
```

Almacenamiento de objeto en array de objetos:

```js
usuarios.push(nuevoUsuario);
```
Simulación de base de datos

Respuesta del servidor con status code:

```js
return res.status(201).json({
    mensaje: "Usuario creado",
    usuario: nuevoUsuario
  });
```

### 🔹 PUT /usuarios/:id    

Actualiza un usuario existente según su ID.

```js
app.put("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = usuarios.findIndex(elemento => elemento.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  const { nombre, email } = req.body;

  usuarios[index] = {
  ...usuarios[index],
  nombre,
  email
  };
  
  return res.status(200).json({
    mensaje: "Usuario actualizado",
    usuario: usuarios[index]
  });
});
```

Detalle del codigo anterior por fragmentos:

```js
app.put("/usuarios/:id", (req, res) => {
```
- `app.put` define un endpoint **HTTP PUT**
- `/usuarios/:id` ruta dinámica
- `(req, res)` callback que se ejecuta cuando alguien llama a esa ruta

Conversion y asignación de valor a variable:

```js
const id = Number(req.params.id);
```

El parámetro `:id` forma parte de la URL y se accede mediante `req.params.id`.  
Dado que Express lo recibe como string, se convierte a número para poder compararlo correctamente.

El método `findIndex()`: 
se utiliza para recorrer un array y devolver el índice (posición) del primer elemento que cumpla con la condición definida.
Si no encuentra coincidencias, devuelve `-1`.

Estructura con llaves: 

```js
array.findIndex(elemento => {
  return elemento.clave === 1;
});
```

Estructura sin llaves:

```js
array.findIndex(elemento => elemento.clave === 1);
```

Ejemplo usado en código: 

```js
const index = usuarios.findIndex(elemento => elemento.id === id);
```

Condicional de usuario no encontrado:

```js
if (index === -1) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }
```

Asignación de valores a variables:

```js
const { nombre, email } = req.body;
```

Actualización de usuario:

```js
usuarios[index] = {
  ...usuarios[index],
  nombre,
  email
};
```

En este fragmento, el operador `...` (spread) se utiliza para copiar todas las propiedades actuales del usuario dentro de un nuevo objeto.

1. Primero se copian los valores existentes (...usuarios[index])
2. Luego se sobrescriben explícitamente los campos que se quieren modificar

De esta forma, el usuario conserva su información previa y solo se actualizan los datos indicados.

Respuesta del servidor con status code:

```js
return res.status(200).json({
    mensaje: "Usuario actualizado",
    usuario: usuarios[index]
  });
```

### 🔹 DELETE /usuarios/:id 

Elimina un usuario según su ID.

```js
app.delete("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = usuarios.findIndex(elemento => elemento.id === id);

  if (index === -1) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  const usuarioEliminado = usuarios.splice(index, 1);

  return res.status(200).json({
    mensaje: "Usuario eliminado",
    usuario: usuarioEliminado[0]
  });
});
```

Detalle del codigo anterior por fragmentos:

```js
app.delete("/usuarios/:id", (req, res) => {
```
- `app.delete` define un endpoint **HTTP DELETE**
- `/usuarios/:id` ruta dinamica
- `(req, res)` callback que se ejecuta cuando alguien llama a esa ruta

Conversion y asignación de valor a variable:

```js
const id = Number(req.params.id);
```

El parámetro `:id` forma parte de la URL y se accede mediante `req.params.id`.  
Dado que Express lo recibe como string, se convierte a número para poder compararlo correctamente.

```js
const index = usuarios.findIndex(elemento => elemento.id === id);
```

El método `findIndex()`: 
se utiliza para recorrer un array y devolver el índice (posición) del primer elemento que cumpla con la condición definida.
Si no encuentra coincidencias, devuelve `-1`.

Condicional de usuario no encontrado:

```js
if (index === -1) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }
```
El `return` evita que el código siga ejecutándose.

Eliminación de usuario del array `usuarios`:

```js
const usuarioEliminado = usuarios.splice(index, 1);
```
El método `.splice()` modifica el array original.
- El primer parámetro indica el índice desde donde comenzar la eliminación.
- El segundo parámetro indica la cantidad de elementos a eliminar.
- Finalmente devuelve un array con los elementos eliminados, que se almacena en la variable usuarioEliminado.

En este caso, se elimina un solo elemento a partir del índice encontrado.

Respuesta del servidor con status code:

```js
  return res.status(200).json({
    mensaje: "Usuario eliminado",
    usuario: usuarioEliminado[0]
  });
```
- Se crea un objeto literal anónimo que se pasa directamente como argumento al método res.json().
- `.status()` establece el código de estado HTTP que será enviado en la respuesta.
- `usuarioEliminado` es el array previamente creado y el índice [0] hace referencia al único elemento de ese array

--- 

## 🧪 Ejemplos de uso de los Endpoints

En los endpoints que reciben datos (POST y PUT), el cliente debe enviar el header
`Content-Type: application/json` para indicar que el cuerpo de la petición está en formato JSON.
Este header lo envía el consumidor de la API (Postman, curl, frontend, etc.)

**fetch (JavaScript / frontend):**
```js
fetch("http://localhost:3000/usuarios", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    nombre: "Carlos",
    email: "carlos@mail.com"
  })
});
```

**curl (terminal):**
```bash
curl -X POST http://localhost:3000/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Carlos","email":"carlos@mail.com"}'
```

**Postman:**

1. Selecionar metodo POST o PUT
2. Elegir Body
3. Selecionar raw
4. elegir JSON

Automaticamente Postman agrega:

```bash
Content-Type: application/json
```

### GET /usuarios
Obtiene la lista completa de usuarios.

Request:
```http
GET /usuarios
```

Response (200 OK):
```json
[
  {
    "id": 1,
    "nombre": "Juan",
    "email": "juan@mail.com"
  },
  {
    "id": 2,
    "nombre": "Ana",
    "email": "ana@mail.com"
  }
]
```

### GET /usuarios/:id
Obtiene un usuario por su ID.

equest:
```http
GET /usuarios/1
```

Response (200 OK):
```json
{
  "id": 1,
  "nombre": "Juan",
  "email": "juan@mail.com"
}
```

Response (404 Not Found):
```json
{
  "mensaje": "Usuario no encontrado"
}
```

### POST /usuarios
Crea un nuevo usuario.

Header:
```http
Content-Type: application/json
```

Request Body:
```json
{
  "nombre": "Carlos",
  "email": "carlos@mail.com"
}
```

Response (201 Created):
```json
{
  "mensaje": "Usuario creado",
  "usuario": {
    "id": 3,
    "nombre": "Carlos",
    "email": "carlos@mail.com"
  }
}
```

### PUT /usuarios/:id
Actualiza un usuario existente.

Header:
```http
Content-Type: application/json
```

Request Body:
```json
{
  "nombre": "Juan Actualizado",
  "email": "juannuevo@mail.com"
}
```

Response (200 OK):
```json
{
  "mensaje": "Usuario actualizado",
  "usuario": {
    "id": 1,
    "nombre": "Juan Actualizado",
    "email": "juannuevo@mail.com"
  }
}
```

Response (404 Not Found):
```json
{
  "mensaje": "Usuario no encontrado"
}
```

### DELETE /usuarios/:id
Elimina un usuario por su ID.

Request:
```http
DELETE /usuarios/1
```

Response (200 OK):
```json
{
  "mensaje": "Usuario eliminado",
  "usuario": {
    "id": 1,
    "nombre": "Juan",
    "email": "juan@mail.com"
  }
}
```

Response (404 Not Found):
```json
{
  "mensaje": "Usuario no encontrado"
}
```

---


## ▶️ Ejecución de la API

```bash
node index.js
```

```bash
http://localhost:3000/usuarios
http://localhost:3000/usuarios/1
```

Los endpoints POST, PUT y DELETE deben ser probados usando herramientas como Postman, curl o fetch, ya que no pueden ejecutarse directamente desde el navegador.