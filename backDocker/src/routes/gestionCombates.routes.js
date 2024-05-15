import { Router } from 'express';
import { createParticipacion } from '../controller/gestionCombates.controller.js'
const router = Router();

// Rutas para los luchadores
router.post('/api/gestorCombates/:idCombate', createParticipacion);


export default router;
