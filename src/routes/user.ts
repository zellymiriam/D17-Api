import { Router }  from 'express';
import User from '../controllers/user';

const router = Router();
const { addUser, verifyUser, sendVerificationCode } = User;

router.post('/admin/users', addUser);
router.post('/users/sendCode', sendVerificationCode,verifyUser);
router.put('/users/verify', verifyUser);

export default router;
