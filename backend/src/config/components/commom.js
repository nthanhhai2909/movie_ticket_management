'use strict';

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

module.exports = {
    common: {
        appHostUrl: envVars.APP_HOST_URL,
        nodeEnv: envVars.NODE_ENV
    }
};

