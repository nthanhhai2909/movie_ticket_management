import { Router } from 'express';

import user from './module/user/';
import cinema from './module/cinema';
import partner from './module/partner';
const router = Router();

/**
 * @swagger
 *
 * definitions:
 *  ErrorMessage:
 *     type: object
 *     properties:
 *      errorCode:
 *          type: string
 *      field: 
 *          type: string
 *      in: 
 *          type: string
 *      originalValue:
 *          type: string
 *      message: 
 *          type: string    
 * 
 *  SuccessMessage:
 *     type: object
 *     properties:
 *      message:
 *          type: string          
 */
router.use('/api/user', user);


router.use('/api/cinema', cinema);


router.use('/api/partner', partner);


export default router;