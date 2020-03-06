'use strict';
import dotenFlow from 'dotenv-flow';
dotenFlow.config();

import joi from '@hapi/joi';
const envVarsSchema = joi.object({
    APP_HOST_URL: joi.string(),
    NODE_ENV: joi.string()
}).unknown()
    .required();

// eslint-disable-next-line no-process-env
const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const common =  {
    appHostUrl: envVars.APP_HOST_URL,
    nodeEnv: envVars.NODE_ENV
};

export default common;