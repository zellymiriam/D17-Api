import User from '../controllers/user';
import { Router }  from 'express';

const router = Router();
const { addUser } = User;

router.post('/admin/users', addUser);

export default router;
