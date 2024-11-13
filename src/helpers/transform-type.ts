export function transformStringToNumber(value: string) {
	if (typeof value === 'number') {
		return value;
	} else if (typeof value === 'string') {
		const prepareValue = value.replace(',', '.');
		const parsValue = parseFloat(prepareValue);

		if (isNaN(parsValue)) {
			throw `Недопустимое числовое значение: ${value}`;
		}

		return parsValue;
	} else {
		throw `Недопустимое числовое значение: ${value}`;
	}
}
