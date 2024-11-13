// @ts-nocheck

import { Expose, Type } from 'class-transformer';
import { IsString } from 'class-validator';

class ApiWarehouseResponseDto {
	@Expose()
	@IsString()
	warehouseName: string;

	@Expose()
	@Transform(({ value }) => value.replace(',', '.'))
	@IsString()
	boxDeliveryAndStorageExpr: string;

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

class ApiWarehousesDataResponseDto {
	@Expose()
	dtNextBox: string;

	@Expose()
	dtTillMax: string;

	@Expose()
	warehouseList: ApiWarehouseResponseDto[];
}

class ApiWarehousesResponseDTO {
	@Expose()
	data: ApiWarehousesDataResponseDto;
}

export class FullApiWarehousesResponseDTO {
	@Expose()
	response: ApiWarehousesResponseDTO;
}
