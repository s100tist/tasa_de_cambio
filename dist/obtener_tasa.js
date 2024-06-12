"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtener_tasa_de_cambio = void 0;
//SF43718 dolar
//SF46410 euro
const credentials_1 = require("./credentials");
const db_1 = require("./db");
async function obtener_tasa_de_cambio() {
    const url = "https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF46410%2CSF43718/datos/oportuno";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Bmx-Token": credentials_1.token
        }
    });
    if (!response.ok) {
        throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const json = await response.json();
    const series = json.bmx.series;
    const client = await db_1.pool.connect();
    try {
        await client.query('BEGIN');
        for (const serie of series) {
            const tipoDeCambio = serie.idSerie === 'SF46410' ? 'euro' : 'dolar';
            for (const dato of serie.datos) {
                const fecha = dato.fecha;
                const valor = parseFloat(dato.dato);
                await client.query('INSERT INTO tasas_de_cambio(fecha, tipo_de_cambio, valor) VALUES ($1, $2, $3) ON CONFLICT (fecha, tipo_de_cambio) DO UPDATE SET valor = EXCLUDED.valor', [fecha, tipoDeCambio, valor]);
            }
        }
        await client.query('COMMIT');
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
    finally {
        client.release();
    }
    return json;
}
exports.obtener_tasa_de_cambio = obtener_tasa_de_cambio;
