'use strict';

import joi from '@hapi/joi';
import common from './commom';
const envVarsSchema = joi.object({
  SERVER_HOST: joi.string(),
  SERVER_PORT: joi.number(),
  FRONTEND_PORT: joi.number()
}).unknown()
  .required();

// eslint-disable-next-line no-process-env
const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
    express: {
        host: envVars.SERVER_HOST,
        port: envVars.SERVER_PORT,
        backendUrl: common.nodeEnv === 'production' ? `${common.appHostUrl}` : `http://${envVars.SERVER_HOST}:${envVars.SERVER_PORT}`,
        frontendUrl: common.nodeEnv === 'production' ? `${common.appHostUrl}` : `http://${envVars.SERVER_HOST}:${envVars.FRONTEND_PORT}`, 
    }
};