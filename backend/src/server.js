import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
// Local import
import router from './router';
import cfg from './config/';
import {handledErrorMiddleware, defaultError} from './middleware/errors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './api-docs/swagger.specs';
const app = express();

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect(cfg.database.url, {
    useNewUrlParser: true, useUnifiedTopology: true
});

/* Enable for all origins */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use('/', router);

// api docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
    return res.status(404).send('Not found!!!');
});

app.listen(cfg.express.port, function () {
    console.log(`http server is listening on port ${cfg.express.port}`);
});

app.use(handledErrorMiddleware);
app.use(defaultError);

export default app;