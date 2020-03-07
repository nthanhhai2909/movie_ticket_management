import { Schema } from 'mongoose';

/**
 * An index that is both sparse and unique prevents collection from having documents with duplicate values for a field but allows
 * multiple documents that omit the key.
 * 
 * Sparse index save values null. So if you save duplicate value is `null` it will throw error E1100
 * If you save with missing value Sparse index will skip it and will not getting errror. 
 * 
 */

export default class BaseSchema extends Schema {

    constructor(definition, options) {
        super(definition, options);
        this.add({
            createdAt: {
                type: Date,
                required: true,
                default: Date.now()
            },
            updatedAt: {
                type: Date,
                required: true,
                default: Date.now()
            },
            isDeleted: {
                type: Boolean,
                default: false,
            },
        });

        this.post('init', function (doc) {
            doc.updatedAt = Date.now();
        });

        this.pre('findOneAndUpdate', function (next) {
            this.select({ isDeleted: false });
            if (this.options.ignoreIsDeleted) {
                return next();
            }
            let query = this.getQuery();
            query.isDeleted = false;
            this.setQuery(query);
            this.update({}, { $set: { updatedAt: Date.now() } });
            next();
        });

        /**
         * If you use findById to find any docs. This pre hook will triggers
         * follow: https://mongoosejs.com/docs/api.html#model_Model.find
         * */
        this.pre('findOne', function (next) {
            this.select({ isDeleted: false });
            if (this.options.ignoreIsDeleted) {
                return next();
            }
            let query = this.getQuery();
            query.isDeleted = false;
            this.setQuery(query);
            next();
        });

        this.pre('find', function (next) {
            this.select({ isDeleted: false });
            if (this.options.ignoreIsDeleted) {
                return next();
            }
            let query = this.getQuery();
            query.isDeleted = false;
            this.setQuery(query);
            next();
        });

        /**
         * if we join the tables, make sure isDeleted in all tables consistent
         * For ex:
         * user {name: 'yourname', isDeleted: true, id: 1},
         * agent{'name': 'yourname', isDeleted: false, userId: 1} 
         * => Result still get user has id '1'
         */
        this.pre('aggregate', function (next) {
            if (this.options.ignoreIsDeleted) {
                return next();
            }
            // Match text must be at the first pipeline(). So We add at index 2 to avoid conflict
            this.pipeline().splice(2, 0, { $match: { isDeleted: false } });
            next();
        });


        /**
         * This method is overridden findOneAndDelete of mongoose.
         * Currently, we must be used this method to delete any model
         * Actually, we mark `isDeleted` is `true` when we delete data.
         * So, if you use method of mongoose, the data really remove from db.
         *  */
        this.statics.findOneAndDelete = async function (query) {
            return await this.findOneAndUpdate(query, { isDeleted: true }, { new: true });
        };
    }
}