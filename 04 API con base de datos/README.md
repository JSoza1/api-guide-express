# 🌐 04 – API con Base de Datos

Este proyecto corresponde a la **cuarta etapa** del repositorio **API Guide Express**.  
El objetivo es **migrar el CRUD con datos en memoria a una base de datos real**, manteniendo **Node.js y Express**, e incorporando **PostgreSQL** para lograr **persistencia de datos**.

En esta etapa la API:
- Implementa un CRUD completo conectado a una base de datos
- Utiliza **PostgreSQL**
- Ejecuta consultas SQL desde Node.js
- Maneja operaciones asincrónicas con `async / await`
- Mantiene una estructura REST
- Devuelve respuestas con códigos de estado HTTP adecuados

---

## 🧠 ¿Por qué usar una base de datos?

En la etapa anterior, los datos se almacenaban en memoria (arrays), lo que implica que:

- Los datos se pierden al reiniciar el servidor
- No existe persistencia
- No es escalable ni usable en un entorno real

Una base de datos permite:
- Guardar información de forma permanente
- Consultar, actualizar y eliminar datos eficientemente
- Trabajar con múltiples usuarios
- Simular un entorno de producción real

---

## 🧠 Conceptos que se practican

- Conexión a base de datos desde Node.js
- PostgreSQL
- Consultas SQL básicas
- Operaciones asincrónicas (`async / await`)
- Persistencia de datos
- Manejo de errores
- Continuidad del patrón CRUD

---

## 🛠️ Preparación del entorno (PostgreSQL en Windows)

Para esta etapa se utiliza **PostgreSQL** como sistema de gestión de base de datos relacional.
Antes de continuar, es necesario tener PostgreSQL **instalado y en ejecución** en el sistema operativo.

### 📥 Instalación de PostgreSQL en Windows

1. Descargar el instalador oficial desde:

https://www.postgresql.org/download/windows/

2. Ejecutar el instalador y seguir los pasos.

Durante la instalación:
- Elegir una contraseña para el usuario `postgres`
- Mantener el puerto por defecto `5432`
- Configuración regional DEFAULT
- No es necesario instalar herramientas adicionales si no se desea

### Agregar PostgreSQL al PATH
Esto es para evitar en la terminal de Windows el error "no se reconoce como un comando interno"

1. Localizar la carpeta "bin"
El primer paso es encontrar dónde se instaló el programa. Casi todos los ejecutables viven en una carpeta llamada bin.

Ejemplo: C:\Program Files\PostgreSQL\18\bin

Acción: Abrir el explorador de archivos, llegar a esa carpeta y copiar la ruta completa desde la barra de direcciones superior.

2. Abrir la configuración del Sistema

- Presionar la tecla Windows.
- Escribir: "Variables de entorno".
- Seleccionar la opción: "Editar las variables de entorno del sistema".

3. Modificar las Variables de Entorno

- Dentro de la ventana pequeña que aparece ("Propiedades del sistema")
- Hacer clic en el botón inferior llamado Variables de entorno, Se abrirá otra ventana, Buscar el cuadro de abajo llamado Variables del sistema.
- Localizar la variable llamada Path y seleccionarla con un clic.
- Hacer clic en el botón Editar.

4. Añadir la nueva ruta
- Se abrirá una lista de rutas
- Hacer clic en el botón Nuevo a la derecha.
- Pegar la ruta que se copió en el primer paso (la que termina en \bin).
- Hacer clic en Aceptar en esa ventana, en la siguiente y en la última (tres "Aceptar" en total).

5. Reiniciar la terminal 
- Windows no actualiza las terminales que ya están abiertas.
- Cerrar cualquier ventana de CMD, PowerShell o terminal de VS Code.
- Abrir una nueva terminal.
- Escribir el comando:

```bash
psql --version
```

Si PostgreSQL está correctamente instalado, se mostrará la versión instalada.

### ▶️ Iniciar PostgreSQL

En Windows, PostgreSQL se ejecuta como un servicio.

Generalmente queda iniciado automáticamente. Si no es así, puede iniciarse desde Servicios de Windows o desde el acceso directo pgAdmin / PostgreSQL

### 🔐 Acceder a PostgreSQL desde la consola

```bash
psql -U postgres
```
Se solicitará la contraseña definida durante la instalación.

### 👤 Ver usuario y conexión actual

Dentro de la consola psql, se pueden usar los siguientes comandos:

```sql
SELECT current_user;
```

```sql
SELECT current_database();
```

### 🗄️ Crear la base de datos

Desde la consola de PostgreSQL:

```sql
CREATE DATABASE api_guide;
```

Para listar las bases de datos disponibles:

```sql
\l
```

Conectarse a la base de datos creada:

```sql
\c api_guide
```

### 📦 Crear la tabla usuarios
Una vez conectados a la base de datos:

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);
```

- `SERIAL` genera el ID automáticamente
- `PRIMARY KEY` garantiza unicidad
- `NOT NULL` evita valores vacíos

### 🔍 Verificar tabla creada

Lista de tablas existentes
```sql
\dt
```

Filas de datos de una tabla
```sql
SELECT * FROM usuarios;
```

> 💡 **Nota:** La tabla se crea y almacena **dentro del motor de base de datos PostgreSQL** (en su carpeta interna `data`, usualmente ubicada en `C:\Program Files\PostgreSQL\...\data`). No se generará ningún archivo visible en la carpeta del proyecto.

> Los comandos SQL deben ejecutarse dentro de la consola `psql` (accediendo previamente con `psql -U postgres` y `\c api_guide`) o utilizando una interfaz gráfica como **pgAdmin**, **DBeaver** o **TablePlus**.

---

## 🔌 Conexión a la base de datos
 
En entornos de producción, las credenciales no deben exponerse en el código fuente. Se recomienda el uso de **variables de entorno** mediante el paquete `dotenv`.
 
1. Instalar `dotenv`:
```bash
npm install dotenv
```
 
2. Crear un archivo llamado `.env` en la raíz del proyecto definir las variables:
```env
DB_USER=postgres
DB_PASSWORD=contraseña_real_aqui
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=api_guide
```
> **Nota:** El puerto por defecto de PostgreSQL es `5432`. Si la instalación utiliza otro, debe modificarse en este archivo.
 
3. Crear el archivo de conexión:
   
   Generar un nuevo archivo llamado `db.js` (usualmente en la raíz o dentro de una carpeta `src/config`). Este archivo será el encargado de establecer y exportar la conexión para que pueda ser utilizada por el resto de la aplicación.
 
   **Contenido de `db.js`:**
```js
import pg from "pg";
import "dotenv/config"; // Importante: Carga las variables del archivo .env al process.env

// Extraemos la clase Pool del paquete pg para manejar múltiples conexiones
const { Pool } = pg;

// Se crea una instancia de Pool para administrar las conexiones
export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
});
```
Esta conexión se reutiliza para ejecutar todas las consultas SQL.

---

## 📡 Endpoints disponibles

A diferencia de la versión en memoria, las operaciones con base de datos son **asincrónicas** (tardan un tiempo en responder). Por eso, es obligatorio el uso de:

*   **`async`**: Declara que la función manejará operaciones lentas.
*   **`await`**: Pausa la ejecución hasta que la base de datos responda. Sin esto, el servidor respondería antes de tener los datos.
*   **Consultas SQL**: Se usan `pool.query('SENTENCIA SQL', [parametros])` para ejecutar comandos en la base de datos.

### 🔹 GET /usuarios

Este endpoint obtiene la lista completa de usuarios.

```js
app.get("/usuarios", async (req, res) => {
  // 1. Enviamos la consulta SQL a la base de datos
  // "SELECT * FROM usuarios" significa: Traeme TODAS las columnas de TODAS las filas de la tabla 'usuarios'
  const result = await pool.query("SELECT * FROM usuarios");
  
  // 2. La base de datos responde con un objeto grande (result)
  // Los datos reales que nos interesan están dentro de la propiedad .rows (filas)
  
  // 3. Enviamos esas filas como respuesta JSON al cliente (Browser / Postman)
  res.json(result.rows);
});
```

**Análisis:**
*   **`pool.query("SELECT * ...")`**: Es el puente entre nuestro código JS y la base de datos.
*   **`const result`**: Guarda TODA la respuesta de Postgres (incluye metadatos, cantidad de filas, etc.).
*   **`result.rows`**: Es el array limpio solo con nuestros usuarios. Si hubiera 3 usuarios, `result.rows` sería un array de 3 objetos.

### 🔹 GET /usuarios/:id

Devuelve un usuario por ID.

```js
app.get("/usuarios/:id", async (req, res) => {
  // 1. Obtenemos el ID de la URL y lo convertimos a número
  const id = Number(req.params.id);

  // 2. Ejecutamos la consulta buscando por ese ID
  // El $1 se reemplazará por la variable [id] de forma segura
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE id = $1",
    [id]
  );

  // 3. Verificamos si la base de datos encontró algo
  if (result.rows.length === 0) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  // 4. Devolvemos SOLO el primer elemento (usuarios es único por ID)
  res.json(result.rows[0]);
});
```

**Análisis: ¿Cómo funciona `WHERE id = $1`?**

1.  **La Plantilla ($1):** El texto SQL `"SELECT ... WHERE id = $1"` es una plantilla incompleta. El `$1` es un marcador que dice *"Aquí va un dato, pero no lo escribo directo"*.
2.  **El Dato ([id]):** El segundo argumento `[id]` es una lista con los valores reales.
3.  **La Fusión Segura:** La librería `pg` toma el valor del array y lo inserta donde está el `$1` antes de enviarlo a la base de datos.

**¿Por qué tanta complejidad? (Seguridad)**
Si escribiéramos `WHERE id = ` + id, un hacker podría enviar código malicioso en la variable `id` y borrar la base de datos (Inyección SQL). Al usar `$1` y un array separado, PostgreSQL neutraliza cualquier código maligno, tratándolo solo como texto inofensivo.

### 🔹 POST /usuarios

Crea un nuevo usuario.

```js
app.post("/usuarios", async (req, res) => {
  // 1. Extraemos los datos que envía el cliente en el cuerpo de la petición (JSON)
  const { nombre, email } = req.body;

  // 2. Insertamos el nuevo usuario en la DB
  // VALUES ($1, $2): Usamos dos marcadores para nombre y email
  // RETURNING *: Ordena a Postgres que nos devuelva la fila recién creada (incluyendo el ID automático)
  const result = await pool.query(
    "INSERT INTO usuarios (nombre, email) VALUES ($1, $2) RETURNING *",
    [nombre, email]
  );

  // 3. Respondemos con código 201 (Creado) y el usuario nuevo
  res.status(201).json({
    mensaje: "Usuario creado",
    usuario: result.rows[0]
  });
});
```

**Análisis: ¿Qué hace `RETURNING *`?**
Por defecto, la sentencia `INSERT` solo confirma la cantidad de filas insertadas, pero no devuelve los datos generados.
Como la base de datos asigna el `ID` automáticamente (autoincremental), el sistema desconoce qué ID se asignó al nuevo registro.
Al agregar la cláusula `RETURNING *`, PostgreSQL devuelve el objeto completo recién creado (incluyendo el nuevo ID), permitiendo enviarlo como confirmación al cliente.

### 🔹 PUT /usuarios/:id

Actualiza un usuario existente.

```js
app.put("/usuarios/:id", async (req, res) => {
  // 1. Obtenemos el ID de la URL y los nuevos datos del cuerpo
  const id = Number(req.params.id);
  const { nombre, email } = req.body;

  // 2. Ejecutamos UPDATE con 3 variables.
  // $1 -> nombre
  // $2 -> email
  // $3 -> id
  const result = await pool.query(
    "UPDATE usuarios SET nombre = $1, email = $2 WHERE id = $3 RETURNING *",
    [nombre, email, id]
  );

  // Si no se modificó ninguna fila (rowCount === 0), el ID no existía
  if (result.rows.length === 0) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  // Devolvemos el usuario actualizado gracias al RETURNING *
  res.json({
    mensaje: "Usuario actualizado",
    usuario: result.rows[0]
  });
});
```
**Nota:** El orden del array `[nombre, email, id]` es crucial. Debe coincidir exactamente con el orden numérico de `$1`, `$2` y `$3` en la sentencia SQL.

### 🔹 DELETE /usuarios/:id

Elimina un usuario.

```js
app.delete("/usuarios/:id", async (req, res) => {
  // 1. Obtenemos el ID a eliminar
  const id = Number(req.params.id);

  // 2. Ejecutamos DELETE filtrando por ID
  // RETURNING *: Sirve para saber QUÉ borramos (y confirmar si existía)
  const result = await pool.query(
    "DELETE FROM usuarios WHERE id = $1 RETURNING *",
    [id]
  );

  // 3. Si no devolvió filas, es porque ese ID no existía para ser borrado
  if (result.rows.length === 0) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  // 4. Confirmamos la eliminación devolviendo los datos del usuario borrado
  res.json({
    mensaje: "Usuario eliminado",
    usuario: result.rows[0]
  });
});
```

---

## ▶️ Ejecución del proyecto

1. **Base de Datos:**
   *   Iniciar PostgreSQL.
   *   Crear la base de datos `api_guide` y la tabla `usuarios` (ver comandos SQL arriba).

2. **Configuración:**
   *   Crear el archivo `.env` con tus credenciales.
   *   Crear el archivo `db.js` con el código de conexión.

3. **Código Servidor:**
   *   Asegurarse de tener el código de la API (endpoints) en `index.js`.

4. **Instalación y Ejecución:**
   ```bash
   npm install      # Instala express, pg, dotenv
   node index.js    # Inicia el servidor
   ```

5. **Pruebas:**
   *   Usar Postman o cualquier otro cliente HTTP para probar los endpoints.
   *   Probar GET /usuarios para obtener todos los usuarios.
   *   Probar GET /usuarios/:id para obtener un usuario por ID.
   *   Probar POST /usuarios para crear un nuevo usuario.
   *   Probar PUT /usuarios/:id para actualizar un usuario.
   *   Probar DELETE /usuarios/:id para eliminar un usuario.