import { Router } from 'express';
import { register, byTicket, getDetail, paid} from '../controller/partner';
const router = Router();


/**
 * @swagger
 * tags:
 *  - name: Partner
 *    description: APIs controls partner
 */


/**
 * @swagger
 *
 * /api/partner/register:
 *  post:
 *      description: add partner
 *      tags:
 *          - Partner
 *      produces:
 *      - application/json
 *      parameters:
 *          - name: name
 *            description: name
 *            in: formData
 *            type: string
 *            required: true
 *          - name: email
 *            description: email
 *            in: formData
 *            required: true
 *            type: string

 *      responses:
 *             201: 
 *                 description: create partner success
 *             422:
 *                 description: Invalid data
 *                 schema:
 *                      $ref: '#/definitions/ErrorMessage'    
 */
router.post('/register', register);

/**
 * @swagger
 *
 * /api/{paidInfor}:
 *  get:
 *      description: paid for ticket
 *      tags:
 *          - Partner
 *      parameters:
 *          - name: paidInfor
 *            in: path
 *            type: string
 *      produces:
 *      - application/json
 *      responses:
 *             200: 
 *                 description: ok  
 */
router.get('/:paidInfor', paid);

/**
 * @swagger
 *
 * /api/{partnerId}/ticket/{ticketId}::
 *  post:
 *      description: buy ticket
 *      tags:
 *          - Partner
 *      produces:
 *      - application/json
 *      parameters:
 *          - name: partnerId
 *            in: path
 *            type: string
 *          - name: row_chair
 *            description: row_chair
 *            in: formData
 *            type: string
 *            required: true
 *          - name: col_chair
 *            description: col_chair
 *            in: formData
 *            required: true
 *            type: string
 *          - name: showTimesId
 *            description: showTimesId
 *            in: formData
 *            required: true
 *            type: string

 *      responses:
 *             201: 
 *                 description:  buy ticket success
 *             422:
 *                 description: Invalid data
 *                 schema:
 *                      $ref: '#/definitions/ErrorMessage'    
 */
router.post('/:partnerId/ticket', byTicket);

/**
 * @swagger
 *
 * /api/{partnerId}/ticket/{ticketId}:
 *  get:
 *      description: get detail ticket of partner
 *      tags:
 *          - Partner
 *      parameters:
 *          - name: partnerId
 *            in: path
 *            type: string
 *          - name: ticketId
 *            in: path
 *            type: string
 *      produces:
 *      - application/json
 *      responses:
 *             200: 
 *                 description: ok  
 */
router.get('/:partnerId/ticket/:ticketId', getDetail);

export default router;