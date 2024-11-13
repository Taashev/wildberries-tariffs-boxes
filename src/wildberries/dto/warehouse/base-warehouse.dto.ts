// @ts-nocheck

import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

import { transformStringToNumber } from '../../../helpers/transform-type';

export class BaseWarehouseDTO {
	@Expose()
	@IsString()
	warehouseName: string;

	@Expose()
	@Transform(({ value }) => transformStringToNumber(value))
	@IsNumber()
	boxDeliveryAndStorageExpr: number;

	@Expose()
	@IsString()
	@Transform(({ value }) => value.replace(',', '.'))
	boxDeliveryBase: string;

	@Expose()
	@IsString()
	@Transform(({ value }) => value.replace(',', '.'))
	boxDeliveryLiter: string;

	@Expose()
	@IsString()
	@Transform(({ value }) => value.replace(',', '.'))
	boxStorageBase: string;

	@Expose()
	@IsString()
	@Transform(({ value }) => value.replace(',', '.'))
	boxStorageLiter: string;
}
