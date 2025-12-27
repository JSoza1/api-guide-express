import express from "express";

const app = express();

// Habilitación de middleware
app.use(express.json());

// Inicialización de array
let usuarios = [
  { id: 1, nombre: "Juan", email: "juan@email.com" },
  { id: 2, nombre: "Ana", email: "ana@email.com" }
];

//.get("/ruta", (callback) => { ... });
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

// Parametro dinámico ":id"
app.get("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
// Busqueda de coincidencia de id en array usuarios
  const usuario = usuarios.find(elemento => elemento.id === id);
// Condicional de usuario no encontrado
  if (!usuario) {
    // return envia mensaje y sale de la función
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }
// Respuesta con usuario encontrado
  res.json(usuario);
});

// app.post("/ruta", (callback) => { ... });
app.post("/usuarios", (req, res) => {
// Asignación de clave-valores especificos en variables
  const { nombre, email } = req.body;

// Creacion de objeto con datos recibidos
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    email
  };

// Agregado de elemento (objeto) a array usuarios
  usuarios.push(nuevoUsuario);

// Respuesta con codigo de status
  return res.status(201).json({
    mensaje: "Usuario creado",
    usuario: nuevoUsuario
  });
});

// app.put("/ruta", (callback) => { ... });
app.put("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  // Busqueda de coincidencia de id en array usuarios
  const index = usuarios.findIndex(elemento => elemento.id === id);

  // Condicional de usuario no encontrado
  if (index === -1) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  // Asignación de clave-valores especificos en variables
  const { nombre, email } = req.body;

  // Actualización de elemento, en array usuarios con datos recibidos
  usuarios[index] = {
  ...usuarios[index],
  nombre,
  email
  };
 
  // Respuesta con codigo de status
  return res.status(200).json({
    mensaje: "Usuario actualizado",
    usuario: usuarios[index]
  });
});

// app.delete("/ruta", (callback) => { ... });
app.delete("/usuarios/:id", (req, res) => {
  const id = Number(req.params.id);
  // Busqueda de coincidencia de id en array usuarios
  const index = usuarios.findIndex(elemento => elemento.id === id);

  // Condicional de usuario no encontrado
  if (index === -1) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  // Modificación del array usuarios
  const usuarioEliminado = usuarios.splice(index, 1);

  // Respuesta con codigo de status
  return res.status(200).json({
    mensaje: "Usuario eliminado",
    usuario: usuarioEliminado[0]
  });
});

//.listen(puerto, (callback) => { ... });
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});