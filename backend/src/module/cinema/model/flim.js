import mongoose from 'mongoose';

import BaseSchema from '../../commom/model/baseschema';
import FILM_CATEGORIES from '../enum/flim.category';

const FlimSchema = new BaseSchema({
    name: {
        type: String,
        required: true
    },
    publisher: {
        type: String
    },
    category: {
        type: String,
        enum: [FILM_CATEGORIES.ACTION, FILM_CATEGORIES.LOVE, FILM_CATEGORIES.ROMANTIC],
        required: true
    },
    sumary: {
        type: String,
        required: String
    },
    openingDay: {
        type: Date,
        required: true
    }
});

export default mongoose.model('Flim', FlimSchema);

