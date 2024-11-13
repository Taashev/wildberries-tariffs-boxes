// @ts-nocheck

import { Expose, Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { BaseWarehouseDTO } from './base-warehouse.dto';

export class WarehouseDTO extends BaseWarehouseDTO {
	formatForDb() {
		return {
			warehouse_name: this.warehouseName,
			box_delivery_and_storage_expr: this.boxDeliveryAndStorageExpr,
			box_delivery_base: this.boxDeliveryBase,
			box_delivery_liter: this.boxDeliveryLiter,
			box_storage_base: this.boxStorageBase,
			box_storage_liter: this.boxStorageLiter,
		};
	}
}
