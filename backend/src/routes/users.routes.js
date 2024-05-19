import { Router } from 'express';
import { getUsers , getUsersId , createUser , updateUser , deleteUser ,createRole , addRoleUser ,getUserRoles} from '../controller/users.controller.js'
import {login } from '../controller/auth.controller.js'
const router = Router();

// Rutas para los luchadores
router.get('/api/users', getUsers);
router.get('/api/users/:id', getUsersId);
router.post('/api/users', createUser);
router.put('/api/users/:id', updateUser);
router.delete('/api/users/:id', deleteUser);
router.post('/api/login', login);
router.post('/api/role', createRole);
router.post('/api/userRole', addRoleUser);
router.get('/api/userRole/:userid', getUserRoles);

export default router;
