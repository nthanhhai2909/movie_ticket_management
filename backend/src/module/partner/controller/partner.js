import crypto from 'crypto';
import Partner from '../model/partner';
import Transaction from '../model/transaction';
import { createTicket } from '../../cinema/controller/ticket';
import { CREATED, OK, BAD_REQUEST } from 'http-status-codes';
import Ticket from '../../cinema/model/ticket';

export const register = async (req, res, next) => {
    const { email, name } = req.body;

    try {
        const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', {
            namedCurve: 'sect239k1',
            publicKeyEncoding: { type: 'spki', format: 'der' },
            privateKeyEncoding: { type: 'pkcs8', format: 'der' }
        });
        await new Partner({
            email: email,
            name: name,
            privateKey: privateKey
        }).save();
        return res.status(CREATED).json({
            publicKey: publicKey
        });
    } catch (err) {
        return next(err);
    }
};



export const byTicket = async (req, res, next) => {
    const { partnerId } = req.params;
    const {
        showTimesId, row_chair, col_chair
    } = req.body;

    try {
        let newTicket = await createTicket(showTimesId, row_chair, col_chair);
        let ticketSaved = await newTicket.save();
        let newTransaction = await new Transaction({
            partnerId: partnerId,
            ticketId: ticketSaved._id
        }).save();
        return res.status(CREATED).json(newTransaction);
    } catch (err) {
        return next(err);
    }
};


export const getDetail = async (req, res, next) => {
    const { ticketId } = req.params;

    try {
        let ticket = await Ticket.findById(ticketId);
        return res.status(OK).json(ticket);
    } catch (err) {
        return next(err);
    }
};

export const paid = async (req, res, next) => {
    const { paidInfor } = req.params;

    try {
        let partnet = await Partner.findById(partnerId);
        let data = JSON.parse(crypto.privateDecrypt(partnet.privateKey, paidInfor).toString());

        const { transactionId, partnerId, paymentToken } = data;

        // SEND PAYMENT TO THIRD PARTY TO TRANFER AMOUNT
        // ASSUME TRUE

        let tranfer = await tranfer(paymentToken); 

        if (tranfer) {
            let transaction = await Transaction.findById(transactionId);
            transaction.status = 'paid';
            await transaction.save();
            return res.status(OK).end();
        }
        return res.status(BAD_REQUEST).end();

    } catch (err) {
        return next(err);
    }
};

const tranfer = async paymentToken => true;