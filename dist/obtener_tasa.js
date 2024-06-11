"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtener_tasa_de_cambio = void 0;
//SF43718 dolar
//SF46410 euro
const token_1 = require("./token");
async function obtener_tasa_de_cambio() {
    var url = "https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF46410%2CSF43718/datos/oportuno";
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Bmx-Token": token_1.token
        }
    });
    const json = await response.json();
    return json;
}
exports.obtener_tasa_de_cambio = obtener_tasa_de_cambio;
;
