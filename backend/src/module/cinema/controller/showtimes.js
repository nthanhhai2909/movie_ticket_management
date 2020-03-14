import { CREATED, OK } from 'http-status-codes';
import mongoose from 'mongoose';
import ShowTimes from '../model/show.times';

export const add = async (req, res, next) => {
    try {
        const {startTime, endTime, roomId, flimId, basePrice} = req.body;
        await new ShowTimes({
            startTime: startTime,
            endTime: endTime,
            roomId: mongoose.Types.ObjectId(roomId),
            flimId: mongoose.Types.ObjectId(flimId),
            basePrice: basePrice
        }).save();
        return res.status(CREATED).end();
    } catch (err) {
        return next(err);
    }
};


export const get = async (req, res, next) => {
    try {
        let data = await ShowTimes.find({
            endTime: {
                $gte: Date.now()
            }
        });
        return res.status(OK).json(data);
    } catch(err) {
        return next(err);
    }
};