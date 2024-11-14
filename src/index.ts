import './app.config';

import './database/index';
import './google/index';

import { task } from './tasks/task';

(async function app() {
	try {
		task();

		setInterval(() => {
			task();
		}, 3_600_000); // каждый час запускать task
	} catch (error) {
		console.error(error);
	}
})();
