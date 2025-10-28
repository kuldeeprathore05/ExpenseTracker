import express from 'express'
import {createTransaction,getAllTransatcion,updateTranaction,deleteTransaction,getTransactionStat, getSingleTransaction } from '../controllers/transaction.js'
import { auth } from '../middlewares/auth.js';
const router = express.Router();
router.use(auth); 
router.get('/',getAllTransatcion);
router.get('/stats',getTransactionStat);
router.get('/:id',getSingleTransaction);
router.post('/',createTransaction);
router.put('/:id',updateTranaction);
router.delete('/:id',deleteTransaction);
export default router