//SF43718 dolar
//SF46410 euro
import { token } from './credentials';
import { pool } from './db';

interface Serie {
  idSerie: string;
  datos: { fecha: string; dato: string }[];
}

interface BMXResponse {
  bmx: {
    series: Serie[];
  };
}

export async function obtener_tasa_de_cambio(): Promise<BMXResponse> {
  const url = "https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF46410%2CSF43718/datos/oportuno";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      "Bmx-Token": token
    }
  });

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const json = await response.json() as BMXResponse;

  const series = json.bmx.series;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const serie of series) {
      const tipoDeCambio = serie.idSerie === 'SF46410' ? 'euro' : 'dolar';
      for (const dato of serie.datos) {
        const fecha = dato.fecha;
        const valor = parseFloat(dato.dato);
        await client.query(
          'INSERT INTO tasas_de_cambio(fecha, tipo_de_cambio, valor) VALUES ($1, $2, $3) ON CONFLICT (fecha, tipo_de_cambio) DO UPDATE SET valor = EXCLUDED.valor',
          [fecha, tipoDeCambio, valor]
        );
      }
    }
    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }

  return json;
}
