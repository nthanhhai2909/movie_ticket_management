import { Router } from 'express';

import user from './module/user';

const router = Router();
router.use('/api/user', user);

export default router;