import { Router } from 'express';
import { getLuchadoresPeso , getCombatesEvento , getarbitrosAsignados , getUltimosCombates , getAllcombates , getLuchadoresPesoAll ,getCampeones , getRanking} from '../controller/vistas.controller.js'
const router = Router();

router.get('/api/vista/luchadoresPeso/:peso', getLuchadoresPeso);
router.get('/api/vista/luchadoresPesoAll', getLuchadoresPesoAll);
router.get('/api/vista/combateEventos/:idevento', getCombatesEvento);
router.get('/api/vista/arbitrosAsignados/:idarbitro', getarbitrosAsignados);
router.get('/api/vista/ultimosCombates', getUltimosCombates);
router.get('/api/vista/allcombates/:idevento', getAllcombates);
router.get('/api/vista/campeones', getCampeones);
router.get('/api/vista/ranking/:peso', getRanking);
export default router;