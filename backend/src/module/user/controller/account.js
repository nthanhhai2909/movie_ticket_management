import { CREATED } from 'http-status-codes';

import User from '../model/user';
export const register = async (req, res, next) => {
    try {
        let newUser = new User(req.body);
        await newUser.save();
        // TODO Send email to verify account
        return res.status(CREATED).end();
    } catch (err) {
        return next(err);
    }
};