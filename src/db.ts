/*
CREATE TABLE mis_datos.tasa_de_cambio (
    id SERIAL PRIMARY KEY,
    fecha DATE NOT NULL,
    tipo_cambio NUMERIC(10, 4) NOT NULL
);
CREATE TABLE tc.tasas_de_cambio (
  fecha DATE NOT NULL,
  tipo_de_cambio VARCHAR(10) NOT NULL,
  valor NUMERIC NOT NULL,
  PRIMARY KEY (fecha, tipo_de_cambio)
);
 */
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config(); 

export const pool = new Pool({
  user: process.env.DB_USER,     // Usuario de PostgreSQL
  host: process.env.DB_HOST,     // Host donde está corriendo PostgreSQL
  database: process.env.DB_NAME, // Nombre de la base de datos
  password: process.env.DB_PASS, // Contraseña del usuario
  port: Number(process.env.DB_PORT),     // Puerto de conexión
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  release(); // Liberar cliente
});