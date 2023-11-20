"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); //Transformamos la req.body en json
const PORT = 3000;
app.get('/', (_req, res) => {
    res.send('inicio' + 2023);
});
app.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
});
