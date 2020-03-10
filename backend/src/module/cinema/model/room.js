import mongoose from 'mongoose';
import BaseSchema from '../../commom/model/baseschema';
import CHAIR_CATEGORIES from '../enum/chair.category';
const RoomSchema = new BaseSchema ({
    chair: {
        type: [
            [
                {
                    category: String,
                    enum: [CHAIR_CATEGORIES.A, CHAIR_CATEGORIES.B, CHAIR_CATEGORIES.C],
                    default: CHAIR_CATEGORIES.A
                }
            ]
        ]
    }
});


export default mongoose.model('Room', RoomSchema);