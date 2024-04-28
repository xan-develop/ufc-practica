import { Router } from 'express';
import { getCombate, getCombates, createCombate, updateCombate, deleteCombate } from '../controller/combate.controller.js';

const router = Router();

// Rutas para los combates
router.get('/api/combates', getCombates);
router.get('/api/combates/:id', getCombate);
router.post('/api/combates', createCombate);
router.put('/api/combates/:id', updateCombate);
router.delete('/api/combates/:id', deleteCombate);

export default router;
