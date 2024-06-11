//SF43718 dolar
//SF46410 euro
import { token } from "./token";
export async function obtener_tasa_de_cambio(){
    var url = "https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF46410%2CSF43718/datos/oportuno";

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Bmx-Token": token  

        }
    });
    const json = await response.json();
    return json;
    
};