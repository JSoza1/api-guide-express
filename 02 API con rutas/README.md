# 🌐 02 – API con rutas

Este proyecto corresponde a la **segunda etapa** del repositorio **API Guide Express**.  
El objetivo es **ampliar la API básica**, incorporando **múltiples rutas (endpoints)** y distintos **métodos HTTP**, manteniendo una estructura simple.

A diferencia del proyecto anterior, aquí la API:
- Maneja más de un endpoint
- Utiliza parámetros en la URL
- Comienza a diferenciar tipos de peticiones HTTP

---

## 🧠 Conceptos que se practican

- Múltiples endpoints
- Métodos HTTP (GET, POST)
- Parámetros de ruta (`req.params`)
- Cuerpo de la petición (`req.body`)
- Respuestas en formato JSON

---

## 🚀 Configuración inicial

La configuración inicial es la misma que en el proyecto **01 – API Básica**:

1. Inicializar el proyecto con npm  
2. Instalar Express   
3. Crear el archivo `index.js` 
4. Configurar ES Modules (`"type": "module"`) e Importar express en `index.js` 
5. Inicializar la variable que representa el servidor y asignar el valor de express()
6. Definir los Endpoints
7. Iniciar servidor con .listen()

---

## 📡 Endpoints disponibles

### 🔹 GET /hola

Devuelve un mensaje simple en formato JSON.

```js
app.get("/hola", (req, res) => {
  res.json({ mensaje: "Hola mundo!" });
});
```

### 🔹 GET /saludo/:nombre

Recibe un parámetro dinámico por la URL y lo utiliza para construir la respuesta.

```js
app.get("/saludo/:nombre", (req, res) => {
  const nombre = req.params.nombre;

  res.json({
    mensaje: `Hola ${nombre}`
  });
});
```
Al agregar `:` al final de una ruta seguido de un nombre, se esta definiendo un parametro dinámico, el cual sera almacenado en `req.params`, esto permite crear rutas reutilizables.

Ejemplos:

Parametro `:nombre`, para acceder a su valor es `req.params.nombre` y para ser utilizado se almacena en una variable
```js
const nombre = req.params.nombre
```

Parametro `:id`, para acceder a su valor es `req.params.id`  y para ser utilizado se almacena en una variable
```js
const id = req.params.id
```

Ejemplo de uso:

```bash
http://localhost:3000/saludo/Juan
```

Respuestas esperada:

```json
{
  "mensaje": "Hola Juan"
}
```

### 🔹 POST /usuario

Este endpoint recibe datos enviados desde el cliente en formato JSON.
Antes de definir rutas POST, se debe habilitar el middleware para leer JSON:

```js
app.use(express.json());
```
- Convierte el contenido JSON enviado en la request en un objeto
JavaScript accesible desde `req.body`, permitiendo su posterior manipulación.

- Un middleware sirve para hacer algo ANTES de que la ruta responda.

Para poder almacenar los datos recibidos y consultarlos posteriormente,
se define un array que actúa como almacenamiento en memoria:

```js
const usuarios = [];
```

Definición del endpoint:

```js
app.post("/usuario", (req, res) => {
  const usuario = req.body;

  usuarios.push(usuario)

  res.json({
    mensaje: "Usuario recibido",
    usuario
  });
});
```

`req.body` contiene los datos enviados en la petición
Se utiliza el método POST para enviar información al servidor

---

## 🧪 Envío de datos con Postman (POST)

Para enviar información al endpoint `POST /usuario` se puede utilizar
**Postman**, que permite realizar y probar peticiones HTTP
de forma visual.

### 1️⃣ Crear un Workspace
Al abrir Postman Desktop por primera vez, se solicita crear o seleccionar
un **Workspace**.  
Se puede utilizar un workspace personal por defecto o crear uno nuevo.

### 2️⃣ Crear una nueva request
Dentro del workspace:

- Click en **New**
- Seleccionar **HTTP Request**
- Método: **POST**
- URL:
```bash
http://localhost:3000/usuario
```

### 3️⃣ Configurar el Body

- Ir a la pestaña Body
- Seleccionar raw
- Elegir JSON como formato

Ejemplo de body enviado:

```json
{
  "nombre": "Juan",
  "email": "juan@email.com"
}
```

### 4️⃣ Enviar la petición

Presionar el botón Send.

### 5️⃣ Respuesta esperada

```json
{
  "mensaje": "Usuario recibido",
  "usuario": {
    "nombre": "Juan",
    "email": "juan@email.com"
  }
}
```

Los datos enviados quedan almacenados en memoria y pueden ser consultados mediante el endpoint GET /usuarios.

📌 Si el servidor se reinicia, los datos almacenados se pierden.

---

## ▶️ Ejecución de la API

```bash
node index.js
```

Probar los endpoints desde el navegador o herramientas como Postman:

```bash
http://localhost:3000/hola
http://localhost:3000/saludo/Juan
http://localhost:3000/usuarios
```