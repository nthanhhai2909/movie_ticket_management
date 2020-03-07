
import { LogicalException } from 'node-exceptions';

class Exception extends LogicalException {
    responseStatus() {
        return this.status || 500;
    }
   
    handle(req, res, next) {
        res.status(this.responseStatus());
        res.json({
            errors: this.message
        });
        next();
    }
}

export default Exception;