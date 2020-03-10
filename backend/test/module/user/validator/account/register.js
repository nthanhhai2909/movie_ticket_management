/* eslint-disable no-undef */
import sinon from 'sinon';
import chai from 'chai';
import { requiredValidator, formatValidator, consistentValidator } from '../../../../../src/module/user/validator/account/register';
import ValidatorUtils from '../../../../../src/module/commom/utils/ValidatorUtils';
import _ from 'lodash';
import TestDbHelper from '../../../../mock-database/test.db.helper';
import User from '../../../../../src/module/user/model/user';
import logger from '../../../../../src/logger/logger';

describe('unit test for requiredValidator function ', () => {
    let req = { body: {} }, res, next;

    beforeEach(() => {
        next = sinon.spy();
        res = {};
    });
    afterEach(() => {
        sinon.restore();
    });

    it('requiredValidator for all field is null', () => {
        let throwInputExceptionStub = sinon.stub(ValidatorUtils, 'throwInputException');
        requiredValidator(req, res, next);
        chai.expect(throwInputExceptionStub.called).to.eq(true);
        sinon.assert.calledWith(throwInputExceptionStub, sinon.match(function (errors) {
            chai.expect(_.isArray(errors)).to.eq(true);
            chai.assert.equal(errors.length, 3);
            for (let err of errors) {
                chai.assert.equal(err.field === 'email' || err.field === 'password' || err.field === 'phonenumber', true);
            }
            return true;
        }));
    });

    it('requiredValidator passed', () => {
        req.body = {
            email: 'your_email',
            password: 'your_password',
            phonenumber: 'phonenumber'
        };

        let throwInputExceptionStub = sinon.stub(ValidatorUtils, 'throwInputException');
        requiredValidator(req, res, next);
        chai.expect(next.called).to.eq(true);
        chai.expect(throwInputExceptionStub.called).to.eq(true);
        sinon.assert.calledWith(throwInputExceptionStub, sinon.match(function (errors) {
            chai.expect(_.isArray(errors)).to.eq(true);
            chai.assert.equal(errors.length, 0);
            return true;
        }));
    });
});


describe('unit test for formatvalidator', () => {
    let req = { body: {} }, res, next;

    beforeEach(() => {
        next = sinon.spy();
        res = {};

    });
    afterEach(() => {
        sinon.restore();
    });

    it('should throw errors when all data invalid format', () => {
        req.body = {
            email: 'email',
            password: '123',
            phonenumber: 'phonenumber'
        };

        let throwInputExceptionStub = sinon.stub(ValidatorUtils, 'throwInputException');
        formatValidator(req, res, next);
        chai.expect(throwInputExceptionStub.called).to.eq(true);
        sinon.assert.calledWith(throwInputExceptionStub, sinon.match(function (errors) {
            chai.expect(_.isArray(errors)).to.eq(true);
            chai.assert.equal(errors.length, 3);
            for (let err of errors) {
                chai.assert.equal(err.field === 'email' || err.field === 'password' || err.field === 'phonenumber', true);
            }
            return true;
        }));
    });

    it('should passed formatvalidator', () => {
        let throwInputExceptionStub = sinon.stub(ValidatorUtils, 'throwInputException');
        req.body = {
            email: 'yourmail@gmail.com',
            password: '123456',
            phonenumber: '0978191710'
        };
        formatValidator(req, res, next);
        chai.expect(next.called).to.eq(true);
        chai.expect(throwInputExceptionStub.called).to.eq(true);
    });

});

describe('unit test for consistentValidator', () => {
    const dbHelper = new TestDbHelper();
    let req = {
        body: {
            email: 'email',
            password: 'fullname',
            phonenumber: '0978191710',
        }
    }, res, next;

    before(async () => {
        await dbHelper.start();
    });

    after(async () => {
        await dbHelper.stop();
    });

    beforeEach(() => {
        next = sinon.spy();
        res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        res.end = sinon.stub().returns(res);
    });
    afterEach(() => {
        sinon.restore();
    });

    it('should throw error when email already', async () => {
        await new User({
            email: 'email@gmail.com',
            password: '123456',
            phonenumber: '0978191710'
        }).save();

        req.body = {
            email: 'email@gmail.com',
            password: '123456',
            phonenumber: '0978191719'
        };
        try {
            let throwInputExceptionStub = sinon.stub(ValidatorUtils, 'throwInputException');
            await consistentValidator(req, res, next);
            chai.expect(throwInputExceptionStub.called).to.eq(true);
            sinon.assert.calledWith(throwInputExceptionStub, sinon.match(function (errors) {
                chai.expect(_.isArray(errors)).to.eq(true);
                chai.assert.equal(errors.length, 1);
                chai.assert.equal(errors[0].field, 'email');
                return true;
            }));
        
        } catch(err) {
            logger.error(err);  
        }

    });
});