import { CREATED, BAD_REQUEST } from 'http-status-codes';
import _ from 'lodash';
import ShowTimes from '../model/show.times';
import Room from '../model/room';
import Param from '../model/param';
import Ticket from '../model/ticket';
import InputException from '../../../exception/input.exception';

export const add = async (req, res, next) => {
    try {
        const { showTimesId, row_chair, col_chair } = req.body;
        let newTicket = await createTicket(showTimesId, row_chair, col_chair);
        await newTicket.save();
        return res.status(CREATED).json(newTicket);
    } catch (err) {
        return next(err);
    }
};

export const createTicket = async (showTimesId, row_chair, col_chair) => {
    let showTimeFind = await ShowTimes.findById(showTimesId);
    // Simple validator
    if (showTimeFind.startTime.getTime() < new Date().getTime()) {
        throw new InputException('Invalid', BAD_REQUEST);
    }

    let roomFind = await Room.findById(showTimeFind.roomId);
    let categoryChair = roomFind.chair[row_chair][col_chair];
    let ParamFind = await Param.findOne({ roomId: roomFind._id, category: categoryChair });
    return new Ticket({
        showTimesId: showTimesId,
        discount: _.parseInt(ParamFind.discount),
        price: _.parseInt(showTimeFind.basePrice) - (_.parseInt(showTimeFind.basePrice) * ParamFind.discount) / 100,
        chair: {
            row: row_chair,
            col: col_chair
        }
    });
    // 

};