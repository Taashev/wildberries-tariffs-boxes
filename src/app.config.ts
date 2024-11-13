import { config } from 'dotenv';

import { z } from 'zod';

// загружаем переменные окружения из файла .env
config();

// получаем переменные окружения, валидируем и создаем обьект конфигурации
function getConfig() {
	const configSchema = z.object({
		nodeEnv: z.enum(['production', 'development', 'testing']),

		wbKey: z.string(),

		db: z.object({
			host: z.string().optional().default('localhost'),
			port: z.coerce.number().optional().default(5432),
			name: z.string(),
			user: z.string(),
			password: z.string(),
		}),
	});

	try {
		return configSchema.parse({
			nodeEnv: process.env.NODE_ENV,

			wbKey: process.env.WB_KEY,

			db: {
				host: process.env.DB_HOST,
				port: process.env.DB_PORT,
				name: process.env.DB_NAME,
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
			},
		});
	} catch (error) {
		const prefixError = __filename + ': ' + 'Ошибка валидации конфига:';

		if (error instanceof z.ZodError) {
			console.error(prefixError, error.errors);
		} else {
			console.error(prefixError, error);
		}

		process.exit(1);
	}
}

export const appConfig = getConfig();
