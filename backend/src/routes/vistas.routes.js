import { Router } from 'express';
import { getLuchadoresPeso} from '../controller/vistas.controller.js'
const router = Router();

router.get('/api/vista/luchadoresPeso', getLuchadoresPeso);
export default router;