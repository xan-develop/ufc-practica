import { Router } from 'express';
import { getUsers , getUsersId , createUser , updateUser , deleteUser} from '../controller/users.controller.js'
const router = Router();

// Rutas para los luchadores
router.get('/api/users', getUsers);
router.get('/api/users/:id', getUsersId);
router.post('/api/users', createUser);
router.put('/api/users/:id', updateUser);
router.delete('/api/users/:id', deleteUser);

export default router;
