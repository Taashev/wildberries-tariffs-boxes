import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

export class GoogleApiClient {
	private _keyFile: string;
	private _scopes: string[];
	private _auth!: GoogleAuth;

	constructor(credentialsPath: string, scopes: string[]) {
		this._keyFile = credentialsPath;
		this._scopes = scopes;

		this._connection();
	}

	private async _connection() {
		try {
			this._auth = new google.auth.GoogleAuth({
				keyFile: this._keyFile,
				scopes: this._scopes,
			});
		} catch (error) {
			console.log(error);
			process.exit(1);
		}
	}

	public getSheetsClient() {
		return google.sheets({
			version: 'v4',
			auth: this._auth,
		});
	}
}
