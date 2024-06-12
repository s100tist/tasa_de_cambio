"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
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
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.pool = new pg_1.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number(process.env.DB_PORT), // Puerto de conexión
});
exports.pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL database');
    release(); // Liberar cliente
});
