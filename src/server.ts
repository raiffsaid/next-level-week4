import 'reflect-metadata'
import express from 'express';
import './database'; // Não precisa especificar o index na pasta
import { router } from './routes';

const app = express();

app.use(express.json()); // Inicializar antes das rotas
app.use(router);

app.listen(3333, () => console.log('Server is running'));
