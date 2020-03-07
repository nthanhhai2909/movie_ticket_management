
import logger from '../logger/logger';
/* eslint-disable handle-callback-err */
export function  handledErrorMiddleware (err, req, res, next){
    console.log("handledErrorMiddleware");
    if (err.handle) {
        err.handle(req, res, next);
    } else {
        return next(err);
    }
}

// eslint-disable-next-line no-unused-vars
export function defaultError(err, req, res, next) {
    logger.error(err);
    return res.status(500).json({ message: res.sentry });
}