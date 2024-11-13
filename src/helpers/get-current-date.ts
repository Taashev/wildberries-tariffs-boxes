/**
 *
 * @returns - строка в формате 'ГГГГ-ММ-ДД'
 */
export function getCurrentDataToString(): string {
	const date = new Date();

	const dateToISOString = date.toISOString();

	return dateToISOString.split('T')[0];
}
