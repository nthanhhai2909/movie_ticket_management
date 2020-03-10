'use strict';

import joi from '@hapi/joi';

const envVarsSchema = joi.object({
  SESSION_SECRET: joi.string(),
  SESSION_MAX_AGE: joi.number(),
}).unknown()
  .required();

// eslint-disable-next-line no-process-env
const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default  {
  session: {
    secret: envVars.SESSION_SECRET,
    maxAge: envVars.SESSION_MAX_AGE
  }
};
