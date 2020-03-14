import { Router } from 'express';
import partner from './router/partner';
const router = Router();

router.use('/', partner);

export default router;