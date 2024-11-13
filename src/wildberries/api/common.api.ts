import { appConfig } from '../../app.config';
import { WB_COMMON_API } from '../../utils/constants';
import { FullApiWarehousesResponseDTO } from '../dto/warehouse/full-api-warehouses-response.dto';

import { WBApi } from './base.api';

class WBCommonApi extends WBApi {
	constructor(baseUrl: string, authKey: string) {
		super(baseUrl, authKey);
	}

	/**
	 *
	 * @param date - дата в формате 'ГГГГ-ММ-ДД'
	 */
	async getTariffsBoxByDate(
		date: string,
	): Promise<FullApiWarehousesResponseDTO> {
		return await fetch(this._baseUrl + `/api/v1/tariffs/box?date=${date}`, {
			headers: {
				Authorization: this._key,
			},
		}).then(this._checkResponse);
	}
}

export const wbCommonApi = new WBCommonApi(WB_COMMON_API, appConfig.wbKey);
