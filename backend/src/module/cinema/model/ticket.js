import mongoose from 'mongoose';

import BaseSchema from '../../commom/model/baseschema';

const TicketSchema = new BaseSchema({
    showTimesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Showtimes',
        required: true,
        index: true
    },
    discount: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
    },
    chair: {
        type: {
            row: Number,
            col: Number
        },
        required: true
    }
});

export default mongoose.model('Ticket', TicketSchema);