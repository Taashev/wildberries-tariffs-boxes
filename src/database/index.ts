import { appConfig } from '../app.config';

import knex from 'knex';

const knexFileConfigs = require('../../knexfile');

const knexConfig = knexFileConfigs[appConfig.nodeEnv];

export const knexClient = knex(knexConfig);
