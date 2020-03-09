import { Router } from 'express';
import { requiredValidator, formatValidator, consistentValidator} from '../validator/account/register';
import { register } from '../controller/account';
const router = Router();

router.post('/register', requiredValidator, formatValidator, consistentValidator, register);


export default router;