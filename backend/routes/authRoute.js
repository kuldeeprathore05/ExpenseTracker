import express from 'express'
import { signIn,signUp,me } from '../controllers/auth.js';
import { auth } from '../middlewares/auth.js';
const router = express.Router();
router.post('/signup',signUp);
router.post('/signin',signIn);
router.get('/me',auth,me);
export default router