# 🌐 API Guide Express

Este repositorio fue creado como **guía sobre la creación de APIs REST** utilizando **Node.js y Express** El objetivo es comprender las APIs **desde cero**, comenzando por respuestas simples en JSON y avanzando progresivamente hacia CRUDs completos y conexión con bases de datos.

---

## 📌 ¿Qué es una API?

Una **API (Application Programming Interface)** es un conjunto de rutas (endpoints) que permiten que distintas aplicaciones se comuniquen entre sí.

- Una API **devuelve datos**, normalmente en formato **JSON**
- Es consumida por frontends, apps móviles u otros servidores

## 📌 ¿Qué es una API REST?

Una API REST (Representational State Transfer) es un tipo de API que sigue un conjunto de principios y convenciones para organizar la comunicación entre cliente y servidor.

No es una tecnología ni un framework, sino una forma de diseñar APIs.

## 📌 ¿Qué vuelve REST a una API?

Una API se considera REST cuando cumple principalmente con las siguientes características:

### 1️⃣ Uso de métodos HTTP correctamente

Cada acción se representa con un método HTTP

- GET → obtener datos
- POST → crear datos
- PUT / PATCH → actualizar datos
- DELETE → eliminar datos

Ejemplo:

```bash
GET /usuarios
POST /usuarios
PUT /usuarios/1
DELETE /usuarios/1
```

### 2️⃣ Uso de recursos (no acciones)

Las rutas representan recursos, no verbos

❌ Incorrecto:

```bash
GET /obtenerUsuarios
```

✅ Correcto (REST):

```bash
GET /usuarios
```

### 3️⃣ Comunicación sin estado (Stateless)

Cada request contiene toda la información necesaria para ser procesada.

- El servidor no recuerda requests anteriores
- Cada llamada es independiente

### 4️⃣ Uso de códigos de estado HTTP

Las respuestas indican el resultado usando status codes:

- `200` OK
- `201` Created
- `400` Bad Request
- `404` Not Found
- `500` Internal Server Error

### 5️⃣ Respuestas en formato estándar (JSON)

Los datos se envían y reciben en formatos entendibles por múltiples lenguajes, normalmente JSON.

```json
{
  "id": 1,
  "nombre": "Juan"
}
```

---

## 🧠 Conceptos clave que se practican

- Rutas (endpoints)
- Métodos HTTP (GET, POST, PUT, DELETE)
- Respuestas en JSON
- Status codes
- CRUD
- Bases de datos (en etapas avanzadas)

---

## 🗂️ Estructura del repositorio

### **01 API Básica** 
API mínima con Express (Node.js)

### **02 API con rutas**
Uso de múltiples endpoints y métodos HTTP

### **03 API con crud**
CRUD completo con datos en memoria

### **04 API con base de datos**
API conectada a una base de datos

### README.md

---

## 🚀 Tecnologías utilizadas

- JavaScript
- Node.js
- Express
- JSON
- Postman
- PostgreSQL

---

## 🧩 Requisitos previos

Antes de ejecutar cualquier proyecto, es necesario tener instalado:

- **Node.js** (incluye npm)  
  👉 https://nodejs.org/

- **Editor de código** (recomendado)  
  👉 Visual Studio Code: https://code.visualstudio.com/

- **Postman** (opcional, para probar las API)  
  👉 https://www.postman.com/

Para verificar que Node.js y npm están instalados correctamente:

```bash
node -v
npm -v
```

---

## ▶️ Cómo ejecutar un proyecto

1. Entrar a la carpeta de la API

```bash
cd "01 API basica"
```

2. Instalar dependencias

```bash
npm install
```

3. Ejecutar el servidor

```bash
node index.js
```

4. Probar la API desde el navegador o herramientas como Postman

```bash
http://localhost:3000
```

---

## 📡 Ejemplo de endpoint

```bash
GET /hola
```

```bash
{
  "mensaje": "Hola mundo!"
}
```