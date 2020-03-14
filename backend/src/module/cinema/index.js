import { Router } from 'express';
import flim from './router/flim';
import room from './router/room';
import param from './router/param';
import showtimes from './router/showtimes';
import ticket from './router/ticket';
const router = Router();

router.use('/flim', flim);
router.use('/room', room);
router.use('/param', param);
router.use('/showtimes', showtimes);
router.use('/ticket', ticket);

export default router;