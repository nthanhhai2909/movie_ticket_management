import mongoose from 'mongoose';
import BaseSchema from '../../commom/model/baseschema';

const PartnerSchema = new BaseSchema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    privateKey: {
        type: String,
        required: true
    }
});

export default mongoose.model('Partner', PartnerSchema);

