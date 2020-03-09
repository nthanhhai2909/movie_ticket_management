import {Router} from 'express';
import account from './router/account';

const router = Router();

router.use('/account', account);

export default router;