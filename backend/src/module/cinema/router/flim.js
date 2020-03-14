import { Router } from 'express';
import { add, getAll } from '../controller/flim';
import {requiredValidator, formatValidator, consistentValidator } from '../validator/flim';
const router = Router();


/**
 * @swagger
 * tags:
 *  - name: Flim
 *    description: APIs controls flim
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
 * /api/cinema/flim:
 *  post:
 *      description: add flim
 *      tags:
 *          - Flim
 *      produces:
 *      - application/json
 *      parameters:
 *          - name: name
 *            description: flim name
 *            in: formData
 *            type: string
 *            required: true
 *          - name: publisher
 *            description: flim publisher 
 *            in: formData
 *            required: true
 *            type: string
 *          - name: category
 *            description: category flim
 *            enum:  ['Love', 'Action', 'Romantic']  
 *            in: formData
 *            required: true
 *            type: string
 *          - name: sumary
 *            description: Sumary
 *            in: formData
 *            type: string
 *          - name: openingDay
 *            description: years of candidate's experience
 *            in: formData
 *            required: true
 *            type: number
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
 * /api/cinema/flim:
 *  get:
 *      description: get all flim
 *      tags:
 *          - Flim
 *      produces:
 *      - application/json
 *      parameters:
 *          - name: comming_soon
 *            in: query
 *            type: string
 *            enum: ['true', 'false']
 *      responses:
 *             200: 
 *                 description: ok
 *                 schema:
 *                  type: object
 *                  properties:
 *                      flim:
 *                          type: array
 *                          items: 
 *                             $ref: '#definitions/Flim'
 *                      total:
 *                          type: number
 *             403:
 *                  description: permission denied    
 */

router.get('/', getAll);

export default router;