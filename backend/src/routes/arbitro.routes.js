import { Router } from 'express';
import { getArbitro , getArbitros , createArbitro , updateArbitro , deleteArbitro , createArbitros} from '../controller/arbitro.controller.js'
const router = Router();

// Rutas para los luchadores
router.get('/api/arbitros', getArbitros);
router.get('/api/arbitros/:id', getArbitro);
router.post('/api/arbitros', createArbitro);
router.post('/api/arbitros/varios', createArbitros);
router.put('/api/arbitros/:id', updateArbitro);
router.delete('/api/arbitros/:id', deleteArbitro);

export default router;
