import sinon from 'sinon';
import chai from 'chai';
import { CREATED } from 'http-status-codes';
import User from '../../../../src/module/user/model/user';
import { register } from '../../../../src/module/user/controller/account';
import TestDbHelper from '../../../mock-database/test.db.helper';
/* eslint-disable no-undef */
describe('Unit test for register', () => {
    let dummyError = new Error('dummny error');
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

    it('should throw err when User#save() throw a new error', async () => {
        let saveUserStub = sinon.stub(User.prototype, 'save').throws(dummyError);
        await register(req, res, next);
        chai.expect(saveUserStub.called).to.eq(true);
        sinon.assert.calledWith(next, dummyError);
    });

    it('register success', async () => {
        let saveUserStub = sinon.stub(User.prototype, 'save').returns(new User());
        await register(req, res, next);
        chai.expect(saveUserStub.called).to.eq(true);
        sinon.assert.calledWith(res.status, CREATED);
    });

});