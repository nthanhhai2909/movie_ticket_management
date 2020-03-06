'use strict';

// dotenv-flow will read .env is defined in root package
require('dotenv-flow').config();

const express = require('./components/express');

export default Object.assign({}, express);