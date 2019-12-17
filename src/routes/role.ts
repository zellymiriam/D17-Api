import { Router }  from 'express';
import Role from '../controllers/role';

const router = Router();
const { addRole } = Role;

router.post('/admin/roles', addRole);

export default router;
