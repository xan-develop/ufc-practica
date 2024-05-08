import { Router } from 'express';
import { getLuchadoresPeso , getCombatesEvento , getarbitrosAsignados , getUltimosCombates} from '../controller/vistas.controller.js'
const router = Router();

router.get('/api/vista/luchadoresPeso/:peso', getLuchadoresPeso);
router.get('/api/vista/combateEventos/:idevento', getCombatesEvento);
router.get('/api/vista/arbitrosAsignados/:idarbitro', getarbitrosAsignados);
router.get('/api/vista/ultimosCombates', getUltimosCombates);
export default router;