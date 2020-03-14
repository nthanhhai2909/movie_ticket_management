import { CREATED, OK } from 'http-status-codes';
import Flim from '../model/flim';

export const add = async (req, res, next) => {
    try {
        await new Flim(req.body).save();
        return res.status(CREATED).end();
    } catch (err) {
        return next(err);
    }
};

export const getAll = async (req, res, next) => {
    let { comming_soon } = req.query;
    let query = {};
    if (comming_soon === 'true') {
        var dt = new Date();
         dt.setDate( dt.getDate() - 7 );
 
        query.openingDay = {$gte: dt, $lt: Date.now()};
    }
    try {
        let data = await Flim.find(query);
        return res.status(OK).json(data);
    } catch (err) {
        return next(err);
    }
};