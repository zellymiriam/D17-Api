import { Router }  from 'express';
import verifyToken from '../middlewares/verifyToken'
import {isAdmin} from '../middlewares/role'
import Role from '../controllers/role';

const router = Router();
const { addRole, getRoles} = Role;

router.post('/admin/roles', addRole);
router.get('/admin/roles', verifyToken, isAdmin, getRoles);

export default router;
