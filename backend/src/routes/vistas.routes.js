import { Router } from 'express';
import { getLuchadoresPeso , getCombatesEvento , getarbitrosAsignados , getUltimosCombates , getAllcombates} from '../controller/vistas.controller.js'
const router = Router();

router.get('/api/vista/luchadoresPeso/:peso', getLuchadoresPeso);
router.get('/api/vista/combateEventos/:idevento', getCombatesEvento);
router.get('/api/vista/arbitrosAsignados/:idarbitro', getarbitrosAsignados);
router.get('/api/vista/ultimosCombates', getUltimosCombates);
router.get('/api/vista/allcombates/:idevento', getAllcombates);
export default router;