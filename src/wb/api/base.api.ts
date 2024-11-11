export class WBApi {
	protected _baseUrl: string;
	protected _key: string;

	/**
	 *
	 * @param baseUlr - домен 2, 3... уровня
	 * @param authKey - ключ авторизации
	 */
	constructor(baseUlr: string, authKey: string) {
		this._baseUrl = baseUlr;
		this._key = authKey;
	}

	protected async _checkResponse(response: Response) {
		if (response.ok) {
			return await response.json();
		}

		return response.json().then((error: any) => {
			throw error;
		});
	}

	public async checkConnection() {
		return await fetch('https://common-api.wildberries.ru/ping', {
			headers: {
				Authorization: this._key,
			},
		}).then(this._checkResponse);
	}
}
