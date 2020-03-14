import { CREATED, OK } from 'http-status-codes';
import _ from 'lodash';
import Param from '../model/param';
import mongoose from 'mongoose';
export const add = async (req, res, next) => {
    try {
        await new Param({
            roomId: mongoose.Types.ObjectId(req.body.roomId),
            category: req.body.category,
            discount: _.parseInt(req.body.discount)
        }).save();
        return res.status(CREATED).end();
    } catch (err) {
        return next(err);
    }
};

export const get = async (req, res, next) => {
    try {
        let data = await Param.find();
        return res.status(OK).json(data);
    } catch(err) {
        return next(err);
    }
};