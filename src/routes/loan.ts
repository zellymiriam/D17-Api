import { Router }  from 'express';
import verifyToken from '../middlewares/verifyToken'
import { isPermitted} from '../middlewares/role'
import Loan from '../controllers/loan';

const router = Router();
const { addLoan } = Loan;

router.post('/loan',verifyToken,isPermitted(['treasurer','superAdmin']), addLoan);

export default router;
