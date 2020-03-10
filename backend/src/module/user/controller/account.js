import { CREATED, UNAUTHORIZED, OK } from 'http-status-codes';
import _ from 'lodash';
import jwt from 'jsonwebtoken';
import User from '../model/user';
import errorResponse from '../../commom/dto/error.response';
import ErrorCode from '../../commom/enum/type.error';
import logger from '../../../logger/logger';
import cfg from '../../../config';
import {  invalidMessage } from '../../commom/dto/message.response';
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

export const login = async (req, res, next) => {
    let { email, password } = req.body;

    try{
        let user = await User.findOne({email});
        if (_.isNull(user)) {
            return res.status(UNAUTHORIZED).json(errorResponse().errorCode(ErrorCode.INVALID_DATA).field('email')
            .in('body').message(invalidMessage('email')).build());
        }
    
        let match = await user.verifyPassword(password);
        if (!match) {
            return res.status(UNAUTHORIZED).json(errorResponse().errorCode(ErrorCode.INVALID_DATA).field('password')
            .in('body').message(invalidMessage('password')).build());
        }
        res.status(OK).json({token: await jwt.sign({_id: user._id, role: user.role}, cfg.session.secret, { expiresIn:  cfg.session.maxAge })});
    } catch(err) {
        logger.error(err);
        return next(err);
    }
}