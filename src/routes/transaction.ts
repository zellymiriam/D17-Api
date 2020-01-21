import { Router }  from 'express';
import Transaction from '../controllers/transaction';
import verifyToken from '../middlewares/verifyToken'
import {isTreasurer} from '../middlewares/role'

const router = Router();
const { addTransaction,getTransactions,deleteTransaction, undoTransaction } = Transaction;

router.get('/transactions/:action',verifyToken,getTransactions);
router.post('/transactions',verifyToken,isTreasurer, addTransaction);
router.delete('/transactions/:id',verifyToken,isTreasurer, deleteTransaction);
router.put('/transactions/:id',verifyToken,isTreasurer, undoTransaction);

export default router;
