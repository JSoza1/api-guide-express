import express from "express"

const app = express()

// Habilitación de middleware
app.use(express.json());

// Inicialización de array
const usuarios = [];

//.get("/ruta", (callback) => { ... });
app.get("/hola", (req, res) => {
  res.json({ mensaje: "Hola mundo!" });
});

// Parametro dinámico ":nombre"
app.get("/saludo/:nombre", (req, res) => {
  // Asignacion de valor a variable
  const nombre = req.params.nombre;

  res.json({
    // Uso de template string para insertar variables dentro del texto
    mensaje: `Hola ${nombre}`
  });
});

// app.post("/ruta", (callback) => { ... });
app.post("/usuario", (req, res) => {
  // Lectura de los datos enviados en el body de la request
  const usuario = req.body;

  // Almacenamiento de usuario en array
  usuarios.push(usuario)

  // Respuesta del servidor en formato JSON
  res.json({
    mensaje: "Usuario recibido",
    usuario
  });
});

//.get("/ruta", (callback) => { ... });
app.get("/usuarios", (req, res) => {
    res.json(usuarios);
})

//.listen(puerto, (callback) => { ... });
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});