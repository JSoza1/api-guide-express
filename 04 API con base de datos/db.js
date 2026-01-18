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