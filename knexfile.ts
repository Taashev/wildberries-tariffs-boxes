import { appConfig } from './src/app.config';

import type { Knex } from 'knex';

const { db } = appConfig;

const config: { [key: string]: Knex.Config } = {
	development: {
		client: 'postgresql',
		connection: {
			host: db.host,
			port: db.port,
			database: db.name,
			user: db.user,
			password: db.password,
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: './src/database/migrations',
		},
	},

	testing: {
		client: 'postgresql',
		connection: {
			host: db.host,
			port: db.port,
			database: db.name,
			user: db.user,
			password: db.password,
		},
		debug: true,
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: './src/database/migrations',
		},
	},

	production: {
		client: 'postgresql',
		connection: {
			host: db.host,
			port: db.port,
			database: db.name,
			user: db.user,
			password: db.password,
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
			directory: './src/database/migrations',
		},
	},
};

module.exports = config;
