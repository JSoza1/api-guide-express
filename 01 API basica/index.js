import express from "express";

// Llamado de funcion, que devuelve un objeto y es almacenado en la variable "app"
const app = express()

// get() define una ruta GET y se ejecuta cuando un cliente accede a "/hola"
app.get("/hola", (req, res) => {
    // res.json convierte el objeto de JavaScript a JSON y lo envía
    res.json({ mensaje: "Hola mundo!" });
});

// listen() Inicia el servidor en el puerto 3000 y ejecuta el callback cuando está listo
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});