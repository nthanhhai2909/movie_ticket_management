import { Router } from 'express';
import { add, getAll } from '../controller/room';
import {requiredValidator, formatValidator, consistentValidator } from '../validator/room';
const router = Router();


/**
 * @swagger
 * tags:
 *  - name: Room
 *    description: APIs controls room
 */

  /**
 * @swagger
 * definitions:
 *  Flim:
 *    type: object
 *    properties:
 *      _id:
 *        type: string
 *      name:
 *        type: string
 *        required: true
 *      publisher:
 *        type: string
 *        required: true
 *      category:
 *        type: string
 *        required: true
 *      sumary:
 *        type: string
 *        required: true
 *      openingDay:
 *        type: Date
 *        required: true
 */


/**
 * @swagger
 *
 * /api/cinema/room:
 *  post:
 *      description: add room
 *      tags:
 *          - Room
 *      produces:
 *      - application/json
 *      parameters:
 *          - name: row
 *            description: number of row
 *            in: formData
 *            type: string
 *            required: true
 *          - name: col
 *            description: number of col 
 *            in: formData
 *            required: true
 *            type: string
 *          - name: name
 *            description: room name
 *            in: formData
 *            required: true
 *            type: string

 *      responses:
 *             201: 
 *                 description: create room success
 *             422:
 *                 description: Invalid data
 *                 schema:
 *                      $ref: '#/definitions/ErrorMessage'    
 */


router.post('/', requiredValidator, formatValidator, consistentValidator, add);

/**
 * @swagger
 *
 * /api/cinema/room:
 *  get:
 *      description: get all room
 *      tags:
 *          - Room
 *      produces:
 *      - application/json
 *      responses:
 *             200: 
 *                 description: ok  
 */
router.get('/', getAll);

export default router;