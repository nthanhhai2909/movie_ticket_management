import { BAD_REQUEST} from 'http-status-codes';
import _ from 'lodash';
import InputException from '../../../exception/input.exception';

export default class ValidatorUtils {
    static throwInputException (errors) {
        if (_.isEmpty(errors)) {
            return;
        }
        throw new InputException(errors, BAD_REQUEST);
    }
}