import express from 'express';
import luchadorRoutes from './routes/luchador.routes.js'
import pesoRoutes from './routes/peso.routes.js'
import arbitroRoutes from './routes/arbitro.routes.js'
import eventoRoutes from './routes/eventos.controller.js'
import combateRoutes from './routes/combate.routes.js'
import gestorRoutes from './routes/gestionCombates.routes.js'
import vistasRoutes from './routes/vistas.routes.js'
import suggestRoutes from './routes/sugerencia.routes.js'
import userRoutes from './routes/users.routes.js'
import path from 'path';



const app = express();

//Middlewares
app.use(express.json());

// Middleware para habilitar CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Permitir los métodos HTTP especificados
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Permitir los encabezados especificados
    next();
  });

// Rutas

app.use(luchadorRoutes);
app.use(pesoRoutes);
app.use(arbitroRoutes);
app.use(eventoRoutes);
app.use(combateRoutes);
app.use(gestorRoutes);
app.use(vistasRoutes);
app.use(suggestRoutes);
app.use(userRoutes);

//Exportar
// Configuración para servir archivos estáticos desde la carpeta 'src/img/fighters'
const directorioImagenes = path.join('src', 'img', 'fighters');
app.use('/imagen', express.static(directorioImagenes));

// Ruta para obtener la imagen
app.get('/imagen/:nombreImagen', (req, res) => {
  const nombreImagen = req.params.nombreImagen;
  res.sendFile(path.join(directorioImagenes, nombreImagen));
});
export default app;