import sinon from 'sinon';
import chai from 'chai';
import { requiredValidator } from '../../../../../src/module/user/validator/account/register';
import ValidatorUtils from '../../../../../src/module/commom/utils/ValidatorUtils';
import _ from 'lodash';
describe('unit test for requiredValidator function ', () => {  
    let req = { body: {} }, res, next;

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