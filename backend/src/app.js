import express from 'express';
import luchadorRoutes from './routes/luchador.routes.js'
import pesoRoutes from './routes/peso.routes.js'
import arbitroRoutes from './routes/arbitro.routes.js'
import eventoRoutes from './routes/eventos.controller.js'
import combateRoutes from './routes/combate.routes.js'
import gestorRoutes from './routes/gestionCombates.routes.js'
import vistasRoutes from './routes/vistas.routes.js'



const app = express();

//Middlewares
app.use(express.json());

// Rutas

app.use(luchadorRoutes);
app.use(pesoRoutes);
app.use(arbitroRoutes);
app.use(eventoRoutes);
app.use(combateRoutes);
app.use(gestorRoutes);
app.use(vistasRoutes);

//Exportar

export default app;