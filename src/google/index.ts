import { join } from 'node:path';

import { GoogleApiClient } from './google';
import { GoogleSheetsService } from './google.sheets';

const credentialsFilePath = join(__dirname, '..', '..', 'credentials.json');

console.log(credentialsFilePath);

const googleClient = new GoogleApiClient(credentialsFilePath, [
	'https://www.googleapis.com/auth/spreadsheets',
]);

const sheetsClient = googleClient.getSheetsClient();

export const googleSheetsService = new GoogleSheetsService(sheetsClient);
