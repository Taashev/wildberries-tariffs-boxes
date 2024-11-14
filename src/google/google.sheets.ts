import { sheets_v4 } from 'googleapis';

export class GoogleSheetsService {
	private _sheetsClient: sheets_v4.Sheets;

	constructor(sheetsClient: sheets_v4.Sheets) {
		this._sheetsClient = sheetsClient;
	}

	public async sheetExists(spreadsheetId: string, sheetTitle: string) {
		const response = await this._sheetsClient.spreadsheets.get({
			spreadsheetId: spreadsheetId,
		});

		const sheetList = response.data.sheets;

		return sheetList?.some((sheet) => sheet.properties?.title === sheetTitle);
	}

	public async createList(spreadsheetId: string, sheetTitle: string) {
		try {
			const request = {
				spreadsheetId: spreadsheetId,
				resource: {
					requests: [
						{
							addSheet: {
								properties: {
									title: sheetTitle,
								},
							},
						},
					],
				},
			};

			return this._sheetsClient.spreadsheets.batchUpdate(request);
		} catch (error) {
			console.error(error);
		}
	}

	public async appendData(
		spreadsheetId: string,
		range: string,
		values: any[][],
	): Promise<void> {
		try {
			await this._sheetsClient.spreadsheets.values.append({
				spreadsheetId: spreadsheetId,
				range: range,
				valueInputOption: 'RAW',
				requestBody: { values },
			});
		} catch (error) {
			console.error(error);
		}
	}
}
