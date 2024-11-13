// @ts-nocheck

import { Exclude, Expose, Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

import { WarehouseDTO } from './warehouse.dto';
import { transformStringToNumber } from '../../../helpers/transform-type';

export class WarehouseDbDto {
	@Exclude()
	@IsDate()
	date?: Date;

	@Expose()
	@IsString()
	warehouse_name: string;

	@Expose()
	@Transform(({ value }) => transformStringToNumber(value))
	@IsNumber()
	box_delivery_and_storage_expr: number;

	@Expose()
	@IsString()
	box_delivery_base: string;

	@Expose()
	@IsString()
	box_delivery_liter: string;

	@Expose()
	@IsString()
	box_storage_base: string;

	@Expose()
	@IsString()
	box_storage_liter: string;

	formatForBaseDto() {
		return {
			warehouseName: this.warehouse_name,
			boxDeliveryAndStorageExpr: this.box_delivery_and_storage_expr,
			boxDeliveryBase: this.box_delivery_base,
			boxDeliveryLiter: this.box_delivery_liter,
			boxStorageBase: this.box_storage_base,
			boxStorageLiter: this.box_storage_liter,
		};
	}
}
