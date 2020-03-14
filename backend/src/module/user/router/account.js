import { Router } from 'express';
import { requiredValidator, formatValidator, consistentValidator} from '../validator/account/register';
import { register, login } from '../controller/account';
const router = Router();

/**
 * @swagger
 * tags:
 *  - name: Acount - User
 *    description: APIs controls account
 */

/**
 * @swagger
 *
 * /api/user/account/register:
 *   post:
 *     description: Creates a user
 *     tags: 
 *      - Acount - User
 *     produces:
 *       - application/json
 *     parameters:
 *      - name: email
 *        description: Email to use for register.
 *        in: formData
 *        required: true
 *        type: string
 *      - name: password
 *        description: Password to use for register.
 *        in: formData
 *        required: true
 *        type: string
 *      - name: phonenumber
 *        description: Phone number to use for register.
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *          description: Register success    
 *       422:
 *          description: Data invalid
 *          schema:
 *             type: array
 *             items: 
 *                $ref: '#/definitions/ErrorMessage' 
 *          
 */

router.post('/register', requiredValidator, formatValidator, consistentValidator, register);



/** 
 * @swagger
 * 
 * /api/user/account/login:
 *     post:
 *         description: Login
 *         tags: 
 *             - Acount - User
 *         produces:
 *             - application/json
 *         parameters:
 *             - name: email
 *               description: Email to use for register.
 *               in: formData
 *               type: string
 *             - name: password
 *               description: Password to use for register.
 *               in: formData
 *               type: string
 *         responses:
 *             200: 
 *                 description: Login success
 *                 schema:
 *                   type: object
 *                   properties:
 *                      token:
 *                          type: string
 *             401:
 *                 description: Email or password invalid
 *                 schema:
 *                      $ref: '#/definitions/ErrorMessage'   
 *
 */
router.post('/login', login);


export default router;