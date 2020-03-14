import { Router } from 'express';
import { requiredValidator, formatValidator, consistentValidator } from '../validator/ticket';
import { add } from '../controller/ticket'; 
const router = Router();

/**
 * @swagger
 * tags:
 *  - name: Ticket
 *    description: APIs controls ticket
 */


/**
 * @swagger
 *
 * /api/cinema/ticket:
 *  post:
 *      description: add ticket
 *      tags:
 *          - Ticket
 *      produces:
 *      - application/json
 *      parameters:
 *          - name: showTimesId
 *            description: showTimes to view
 *            in: formData
 *            type: number 
 *            required: true
 *          - name: row_chair
 *            description: row of chair
 *            in: formData
 *            required: true
 *            type: string
 *          - name: col_chair
 *            description: col of chair
 *            in: formData
 *            required: true
 *            type: string    
 *      responses:
 *             201: 
 *                 description: create ticket success
 *             422:
 *                 description: Invalid data
 *                 schema:
 *                      $ref: '#/definitions/ErrorMessage'    
 */

router.post('/', requiredValidator, formatValidator, consistentValidator, add);

export default router;