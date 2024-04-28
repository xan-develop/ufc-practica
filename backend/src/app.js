import express from 'express';
import luchadorRoutes from './routes/luchador.routes.js'
import pesoRoutes from './routes/peso.routes.js'
import arbitroRoutes from './routes/arbitro.routes.js'
import eventoRoutes from './routes/eventos.controller.js'



const app = express();

//Middlewares
app.use(express.json());

// Rutas

app.use(luchadorRoutes);
app.use(pesoRoutes);
app.use(arbitroRoutes);
app.use(eventoRoutes);

//Exportar

export default app;