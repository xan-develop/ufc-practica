import express from 'express';
import luchadorRoutes from './routes/luchador.routes.js'
import pesoRoutes from './routes/peso.routes.js'

const app = express();

//Middlewares
app.use(express.json());

// Rutas

app.use(luchadorRoutes);
app.use(pesoRoutes);

//Exportar

export default app;