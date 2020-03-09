import _ from 'lodash';
import validator from 'validator';
import errorResponse from '../../../commom/dto/error.response';
import ErrorCode from '../../../commom/enum/type.error';
import { requiredMessage, invalidMessage, duplicateMessage } from '../../../commom/dto/message.response';
import ValidatorUtils from '../../../commom/utils/ValidatorUtils';
import User from '../../model/user';
export const requiredValidator = (req, res, next) => {
    const { email, password, phonenumber } = req.body;
    let errors = [];


    if (_.isEmpty(email)) {
        errors.push(errorResponse().errorCode(ErrorCode.REQUIRED)
            .field('email').in('body').message(requiredMessage('email')).build());
    }

    if (_.isEmpty(password)) {
        errors.push(errorResponse().errorCode(ErrorCode.REQUIRED)
            .field('password').in('body').message(requiredMessage('password')).build());
    }

    if (_.isEmpty(phonenumber)) {
        errors.push(errorResponse().errorCode(ErrorCode.REQUIRED)
            .field('phonenumber').in('body').message(requiredMessage('phonenumber')).build());
    }
    ValidatorUtils.throwInputException(errors);
    next();
};

export const formatValidator = (req, res, next) => {
    const { email, password, phonenumber } = req.body;
    let errors = [];
    if (!validator.isEmail(email)) {
        errors.push(errorResponse().errorCode(ErrorCode.INVALID_DATA)
            .field('email').in('body').message(invalidMessage('email')).build());
    }

    if (password.length < 6) {
        errors.push(errorResponse().errorCode(ErrorCode.INVALID_DATA)
            .field('password').in('body').message('Password must be at least 6 characters').build());
    }

    if (!validator.isNumeric(phonenumber)) {
        errors.push(errorResponse().errorCode(ErrorCode.INVALID_DATA)
            .field('phonenumber').in('body').message(invalidMessage('phonenumber')).build());
    }

    ValidatorUtils.throwInputException(errors);
    next();
};


export const consistentValidator = async (req, res, next) => {
    const { email, phonenumber } = req.body;
    let errors = [];
    try {
        let emailFind = await User.findOne({ email });
        if (!_.isNull(emailFind)) {
            errors.push(errorResponse().errorCode(ErrorCode.DUPLICATE_VALUE)
                .field('email').in('body').message(duplicateMessage(email)).build());
        }

        let phoneFind = await User.findOne({ phonenumber });
        if (!_.isNull(phoneFind)) {
            errors.push(errorResponse().errorCode(ErrorCode.DUPLICATE_VALUE)
                .field('phonenumber').in('body').message(duplicateMessage(phonenumber)).build());
        }

        ValidatorUtils.throwInputException(errors);

    } catch (err) {
        return next(err);
    }
    next();
};
