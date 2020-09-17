import { Router }  from 'express';
import verifyToken from '../middlewares/verifyToken'
import { isPermitted} from '../middlewares/role'
import Role from '../controllers/role';

const router = Router();
const { addRole, getRoles} = Role;

router.post('/admin/roles', addRole);
router.get('/admin/roles', verifyToken, isPermitted(['admin','superAdmin']), getRoles);

export default router;
