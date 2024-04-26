import { Router } from 'express';
import { getPesos , getPesoById , updatePeso , deletePeso , createPeso} from '../controller/peso.controller.js'
const router = Router();

router.get('/api/pesos' , getPesos);
router.get('/api/pesos/:id' , getPesoById);
router.post('/api/pesos' , createPeso);
router.put('/api/pesos/:id' , updatePeso);
router.delete('/api/pesos/:id' , deletePeso);

export default router;