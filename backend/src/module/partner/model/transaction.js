import mongoose from 'mongoose';
import BaseSchema from '../../commom/model/baseschema';

const TransactionSchema = new BaseSchema({
    partnerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        enum: ['PAID', 'NO_PAID'],
        default: 'NO_PAID'
    }
});

export default mongoose.model('Transaction', TransactionSchema);

