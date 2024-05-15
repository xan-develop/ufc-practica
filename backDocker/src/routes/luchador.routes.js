import { Router } from 'express';
import { getLuchador , getLuchadores , updateLuchador , deleteLuchador , createLuchador , createLuchadores} from '../controller/luchador.controller.js'
const router = Router();

// Rutas para los luchadores
router.get('/api/luchadores', getLuchadores);
router.get('/api/luchadores/:id', getLuchador);
router.post('/api/luchadores', createLuchador);
router.post('/api/luchadores/varios', createLuchadores);
router.put('/api/luchadores/:id', updateLuchador);
router.delete('/api/luchadores/:id', deleteLuchador);

export default router;
