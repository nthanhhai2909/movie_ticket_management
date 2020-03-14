import { CREATED, OK } from 'http-status-codes';
import _ from 'lodash';
import Room from '../model/room';
import CHAIR_CATEGORIES from '../enum/chair.category';
export const add = async (req, res, next) => {
    try {
        const {row, col, name} = req.body;
        await new Room({
            chair:  createChairMatrix(_.parseInt(row), _.parseInt(col), CHAIR_CATEGORIES.A),
            name: name
        }).save();
        return res.status(CREATED).end();
    } catch (err) {
        return next(err);
    }
};

export const getAll = async (req, res, next) => {
    try {
        let data = await Room.find();
        return res.status(OK).json(data);
    } catch(err) {
        return next(err);
    }
};

const createChairMatrix = (row, col, defaultValue) => {
    let chairs = [];

    for(let i = 0; i < row; i++) {
        let arr = [];
        for(let j = 0; j < col; j++) {
            arr[j] = defaultValue;
        }
        chairs[i] = arr;
    }
    return chairs;
};