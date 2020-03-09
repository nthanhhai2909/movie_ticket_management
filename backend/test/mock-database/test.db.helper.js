import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import logger from '../../src/logger/logger';
import User from '../../src/module/user/model/user';
mongoose.Promise = Promise;

export default class TestDbHelper {
    constructor() {
        this.server = new MongoMemoryServer();
    }


    /**
       * Start the server and establish a connection
    */
    async start() {
        try {
            const url = await this.server.getConnectionString();
            await mongoose.connect(
                url,
                { useNewUrlParser: true }
            );
            await User.init();
        } catch (err) {
            logger.error(err);
        }
    }

    /**
     * Close the connection and stop the server
     */
    async stop() {
        try {
            await this.cleanup();
            await mongoose.disconnect();
            await this.server.stop();
        } catch (err) {
            logger.error(err);
        }
    }

    /**
   * Delete all collections and indexes
   */
    async cleanup() {
        try {
            await mongoose.connection.dropDatabase();
        } catch (err) {
            logger.error(err);
        }

    }
}