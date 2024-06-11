import express from 'express';
import { obtener_tasa_de_cambio } from './obtener_tasa';
const app = express();
const port = 4010;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});


app.get('/tasa_de_cambio', async (req, res) => {
    try {
      const data = await obtener_tasa_de_cambio();
      res.json(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});