import { Router } from 'express';
import { add, get } from '../controller/param';
import {requiredValidator, formatValidator, consistentValidator } from '../validator/param';
const router = Router();


/**
 * @swagger
 * tags:
 *  - name: Param
 *    description: APIs controls flim
 */


/**
 * @swagger
 *
 * /api/cinema/param:
 *  post:
 *      description: add param
 *      tags:
 *          - Param
 *      produces:
 *      - application/json
 *      parameters:
 *          - name: roomId
 *            description: room id
 *            in: formData
 *            type: string
 *            required: true
 *          - name: category
 *            description: category chair
 *            in: formData
 *            required: true
 *            type: string
 *          - name: discount
 *            description: discount
 *            in: formData
 *            required: true
 *            type: number
 *     
 *      responses:
 *             201: 
 *                 description: create flim success
 *             422:
 *                 description: Invalid data
 *                 schema:
 *                      $ref: '#/definitions/ErrorMessage'    
 */
router.post('/', requiredValidator, formatValidator, consistentValidator, add);



/**
 * @swagger
 *
 * /api/cinema/param:
 *  get:
 *      description: get all param
 *      tags:
 *          - Param
 *      produces:
 *      - application/json
 *      responses:
 *             200: 
 *                 description: ok
 */
router.get('/', get);

export default router;