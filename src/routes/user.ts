import { Router }  from 'express';
import User from '../controllers/user';
import { upload }from '../middlewares/multer';
import verifyToken from '../middlewares/verifyToken'
import {isPermitted} from '../middlewares/role'
const router = Router();
const { addUser, verifyUser, sendVerificationCode, updateProfile,setPassword,login,getUser,getUsers } = User;

router.post('/admin/users', verifyToken,isPermitted(['admin','superAdmin']), addUser);
router.post('/users/login', login);
router.post('/users/send-code', sendVerificationCode,verifyUser);
router.put('/users/verify', verifyUser);
router.put('/users/profile/:id', verifyToken,upload, updateProfile);
router.put('/users/set-password/:id', setPassword);
router.get('/users/:id',verifyToken,getUser);
router.get('/admin/users',verifyToken,isPermitted(['admin','superAdmin']), getUsers);

export default router;
