import ErrorCode from '../enum/type.error';
import _ from 'lodash';
const res = {
    errorCode: function (errorCode) {
        if (_.values(ErrorCode).indexOf(errorCode) === -1) {
            throw new Error('Error code invalid');
        }
        this.errorCode = errorCode;
        return this;
    },
    field: function (field) {
        this.field = field;
        return this;
    },
    in: function (dataIn) {
        this.in = dataIn;
        return this;
    },
    originalValue: function (originalValue) {
        this.originalValue = originalValue;
        return this;
    },
    message: function (message) {
        this.message = message;
        return this;
    },
    helpUrl: function (helpUrl) {
        this.helpUrl = helpUrl;
        return this;
    },
    build: function () {
        let response = {
            errorCode: this.errorCode,
            field: this.field,
        };
        if (typeof this.errorCode === 'function') {
            throw new Error('Error code can not empty');
        }

        if (typeof this.field === 'function') {
            throw new Error('Field code can not empty');
        }

        if (typeof this.in !== 'function') {
            response.in = this.in;
        }

        if (typeof this.originalValue !== 'function') {
            response.originalValue = this.originalValue;
        }

        if (typeof this.message !== 'function') {
            response.message = this.message;
        }

        if (typeof this.helpUrl !== 'function') {
            response.helpUrl = this.helpUrl;
        }
        return response;
    }
};

export default () => Object.create(res);
