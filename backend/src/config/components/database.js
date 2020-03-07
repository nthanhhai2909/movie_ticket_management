'use strict';

import joi from '@hapi/joi';
import util from 'util';

const envVarsSchema = joi.object({
  DATABASE_URL: joi.string().allow('', null),
  DATABASE_HOST: joi.string(),
  DATABASE_PORT: joi.number(),
  DATABASE_NAME: joi.string(),
}).unknown()
  .required();

// eslint-disable-next-line no-process-env
const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const databaseUrl = envVars.DATABASE_URL ? envVars.DATABASE_URL : util.format('mongodb://%s:%d/%s', envVars.DATABASE_HOST, envVars.DATABASE_PORT, envVars.DATABASE_NAME);

export default {
  database: {
    url: databaseUrl,
    host: envVars.DATABASE_HOST,
    port: envVars.DATABASE_PORT,
    dbname: envVars.DATABASE_NAME,
  }
};