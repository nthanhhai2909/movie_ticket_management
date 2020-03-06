import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

import cfg from './config/';
/* Enable for all origins */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(cfg.express.port, function () {
    console.log(`http server is listening on port ${cfg.express.port}`);
});
export default app;