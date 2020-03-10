import { Router } from 'express';
import { requiredValidator, formatValidator, consistentValidator} from '../validator/account/register';
import { register, login } from '../controller/account';
const router = Router();

router.post('/register', requiredValidator, formatValidator, consistentValidator, register);

router.post('/login', login);


export default router;