import { WBApi } from './base.api';

class WBCommonApi extends WBApi {
	constructor(baseUrl: string, authKey: string) {
		super(baseUrl, authKey);
	}

	/**
	 *
	 * @param date - дата в формате 'ГГГГ-ММ-ДД'
	 */
	async getTariffsBoxByDate(date: string) {
		return await fetch(this._baseUrl + `/api/v1/tariffs/box?date=${date}`, {
			headers: {
				Authorization: this._key,
			},
		}).then(this._checkResponse);
	}
}

export const wbCommonApi = new WBCommonApi(
	'https://common-api.wildberries.ru',
	process.env.WB_KEY ?? '',
);
