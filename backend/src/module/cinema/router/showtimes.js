import { Router } from 'express';
import {requiredValidator, formatValidator, consistentValidator } from '../validator/showtimes';
import { add, get } from '../controller/showtimes';
const router = Router();

/**
 * @swagger
 * tags:
 *  - name: ShowTimes
 *    description: APIs controls showtimes
 */


/**
 * @swagger
 *
 * /api/cinema/showtimes:
 *  post:
 *      description: add param
 *      tags:
 *          - ShowTimes
 *      produces:
 *      - application/json
 *      parameters:
 *          - name: startTime
 *            description: start time 
 *            in: formData
 *            type: number 
 *            required: true
 *          - name: endTime
 *            description: end time
 *            in: formData
 *            required: true
 *            type: string
 *          - name: roomId
 *            description: room view flim
 *            in: formData
 *            required: true
 *            type: string
 *          - name: flimId
 *            description: flim
 *            in: formData
 *            required: true
 *            type: string
 *          - name: basePrice
 *            description: price
 *            in: formData
 *            required: true
 *            type: number
 *     
 *      responses:
 *             201: 
 *                 description: create showtimes success
 *             422:
 *                 description: Invalid data
 *                 schema:
 *                      $ref: '#/definitions/ErrorMessage'    
 */
router.post('/', requiredValidator, formatValidator, consistentValidator, add);


/**
 * @swagger
 *
 * /api/cinema/showtimes:
 *  get:
 *      description: get all showtimes
 *      tags:
 *          - ShowTimes
 *      produces:
 *      - application/json
 *      responses:
 *             200: 
 *                 description: ok  
 */
router.get('/', get);
export default router;