import { Router } from 'express';
import { getSuggets , getSuggetsId , createSuggets , updateSuggest , deleteSuggest} from '../controller/sugerencias.controller.js'
const router = Router();

// Rutas para los luchadores
router.get('/api/sugerencias', getSuggets);
router.get('/api/sugerencias/:id', getSuggetsId);
router.post('/api/sugerencias', createSuggets);
router.put('/api/sugerencias/:id', updateSuggest);
router.delete('/api/sugerencias/:id', deleteSuggest);

export default router;
