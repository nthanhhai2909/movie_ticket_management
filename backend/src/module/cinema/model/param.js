import mongoose from 'mongoose';
import BaseSchema from '../../commom/model/baseschema';
import CHAIR_CATEGORIES from '../enum/chair.category';

const ParamSchema = new BaseSchema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [CHAIR_CATEGORIES.A, CHAIR_CATEGORIES.B, CHAIR_CATEGORIES.C]
    },
    discount: {
        type: Number,
        default: 0,
        required: true
    }
});

export default mongoose.model('Param', ParamSchema);