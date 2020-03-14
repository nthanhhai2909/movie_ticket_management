import mongoose from 'mongoose';
import BaseSchema from '../../commom/model/baseschema';
const RoomSchema = new BaseSchema ({
    chair: {
        type: [
            [
                String
            ]
        ]
    },
    name: {
        type: String,
        required: true
    }
});


export default mongoose.model('Room', RoomSchema);