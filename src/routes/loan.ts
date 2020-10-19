import { Router }  from 'express';
import verifyToken from '../middlewares/verifyToken'
import { isPermitted} from '../middlewares/role'
import Loan from '../controllers/loan';

const router = Router();
const { addLoan, getLoanTransactions,loanPayment } = Loan;

router.post('/loan',verifyToken,isPermitted(['treasurer','superAdmin']), addLoan);
router.post('/loan/payment',verifyToken,isPermitted(['treasurer','superAdmin']), loanPayment);
router.get('/loans',verifyToken,isPermitted(['treasurer','superAdmin']), getLoanTransactions);

export default router;
