# 🌐 01 – API Básica

Este proyecto representa el **primer paso práctico** del repositorio **API Guide Node.js**.  
Se crea una API mínima utilizando **Node.js y Express**.

---

## 🚀 Pasos para crear la API

### 1️⃣ Inicializar el proyecto
Desde la carpeta del proyecto:

```bash
npm init -y
```
Este comando crea el archivo `package.json` automáticamente, usando valores por defecto.

Como alternativa, también se puede usar:

```bash
npm init
```
En este caso, npm hará preguntas (nombre del proyecto, versión, descripción, etc.) antes de generar el `package.json`.


### 2️⃣ Instalar Express
Express se utiliza para crear el servidor y manejar rutas.

```bash
npm install express
```


### 3️⃣ Crear el archivo principal
Crear el archivo `index.js`, que será el punto de entrada de la API.


### 4️⃣ Importar Express (ES Modules)
En este proyecto se utiliza el sistema de módulos **ES Modules (ESM)**, el estándar actual de JavaScript para la importación y exportación de dependencias. Para que Node.js interprete el código como ES Modules, se define la siguiente propiedad en el archivo `package.json`:

```json
{
  "type": "module"
}
```

Ejemplo de cómo debería quedar el archivo `package.json`:

```json
{
  "name": "1",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^5.2.1"
  }
}
```

Agregar la siguiente linea dentro de index.js:

```js
import express from "express";
```


### 5️⃣ Crear la aplicación
La variable app representa el servidor.

```js
const app = express();
```


### 6️⃣ Definir un endpoint

```js
app.get("/hola", (req, res) => {
  res.json({ mensaje: "Hola desde mi primera API" });
});
```

Este endpoint:
- Responde a peticiones HTTP GET
- Se ejecuta cuando un cliente accede a la ruta /hola
- Devuelve una respuesta en formato JSON

Detalles técnicos:
- app.get(ruta, callback) define una ruta GET
- req (request) contiene la información de la petición
- res (response) se utiliza para enviar la respuesta
- Aunque req no se use en este ejemplo, debe incluirse para mantener el orden de los parámetros


### 7️⃣ Iniciar el servidor

```js
app.listen(puerto, callback);
```

Ejemplo:
```js
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
```

- app → aplicación Express
- listen → método que inicia el servidor y recibe 2 parametros "3000 y callback"
- puerto → número del puerto donde escuchar (ej: 3000)
- callback → función que se ejecuta una sola vez, cuando el servidor se inicia
- La API queda escuchando en el puerto indicado.

```js
app.listen(3000);
```
El callback es opcional, pero recomendable para saber que el servidor arrancó.


---

## ▶️ Ejecución de la API

```bash
node index.js
```

Luego acceder desde el navegador o Postman:

```bash
http://localhost:3000/hola
```

Respuesta esperada:
```json
{
  "mensaje": "Hola mundo!"
}
```