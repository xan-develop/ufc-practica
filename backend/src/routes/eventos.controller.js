import { Router } from 'express';
import { getEvento , getEventos , createEvento , createEventos , updateEvento , deleteEvento } from '../controller/eventos.controller.js'
const router = Router();

// Rutas para los luchadores
router.get('/api/eventos', getEventos);
router.get('/api/eventos/:id', getEvento);
router.post('/api/eventos', createEvento);
router.post('/api/eventos/varios', createEventos);
router.put('/api/eventos/:id', updateEvento);
router.delete('/api/eventos/:id', deleteEvento);

export default router;
