import mongoose from 'mongoose';

import BaseSchema from '../../commom/model/baseschema';

const ShowTimesSchema = new BaseSchema({
    startTime: {
        type: Date,
        required: true,
        index: true
    },
    endTime: {
        type: Date,
        required: true,
        index: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    flimId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flim',
        required: true,
        index: true
    },
    basePrice: {
        type: Number,
        required: true
    }
});

export default mongoose.model('Showtimes', ShowTimesSchema);