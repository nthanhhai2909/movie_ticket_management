import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import BaseSchema from '../../commom/model/baseschema';
import AccountStatus from '../enum/account.status';
import cfg from '../../../config';

const UserSchema = new BaseSchema({
    email: {
        type: String,
        sparse: true,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true,
        sparse: true,
        unique: true
    },
    role: {
        type: String,
        enum: [cfg.role.admin, cfg.role.normal],
        lowercase: true
    },
    status: {
        type: String,
        required: true,
        enum: [AccountStatus.CREATED, AccountStatus.VERIFIED],
        default: AccountStatus.CREATED,
        lowercase: true
    }
});


UserSchema.pre('save', async function () {
    var user = this;
    if (!user.isModified('password')) {
        return;
    }
    try {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    } catch (err) {
        throw new Error(err);
    }
});


UserSchema.methods.verifyPassword = async function (password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
};

export default mongoose.model('User', UserSchema);