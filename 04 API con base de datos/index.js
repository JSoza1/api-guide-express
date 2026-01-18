import express from "express";
import { pool } from "./db.js";

const app = express();

// Habilitación de middleware
app.use(express.json());

//.get("/ruta", (callback) => { ... });
app.get("/usuarios", async (req, res) => {
  // Consulta a la base de datos usando el metodo query del pool
  const result = await pool.query("SELECT * FROM usuarios");

  // Enviar los datos obtenidos como respuesta en formato JSON
  res.json(result.rows);
});

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

//.listen(puerto, (callback) => { ... });
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});