"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const obtener_tasa_1 = require("./obtener_tasa");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 4010;
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
app.get('/tasa_de_cambio', async (req, res) => {
    try {
        const data = await (0, obtener_tasa_1.obtener_tasa_de_cambio)();
        res.json(data);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
