import { plainToInstance } from 'class-transformer';

import { WarehouseDTO } from '../wildberries/dto/warehouse/warehouse.dto';
import { WarehouseDbDto } from '../wildberries/dto/warehouse/warehouse-db.dto';
import { wbWarehousesRepository } from '../wildberries/repository/warehouses.repository';
import { GOOGLE_SPREADSHEET_IDS, SHEET_TITLE } from '../utils/constants';
import { googleSheetsService } from '../google';
import { getCurrentDataToString } from '../helpers/get-current-date';
import { wbCommonApi } from '../wildberries/api/common.api';

export async function task() {
	// текущая дата
	const currentDate = getCurrentDataToString();

	// получаем данные на текущую дату
	const apiWbResponse = await wbCommonApi.getTariffsBoxByDate(currentDate);

	const warehouseListResponse = apiWbResponse.response.data.warehouseList;

	// преобразовываем полученные данные от api к нашему DTO
	const warehouseListDto = warehouseListResponse.map((warehouse) =>
		plainToInstance(WarehouseDTO, warehouse, {
			excludeExtraneousValues: true,
		}),
	);

	// преобразовываем данные для сохранения в БД
	const warehouseListDtoForDb = warehouseListDto.map((warehouse) => {
		const prepareWarehouseDataForDb = warehouse.formatForDb();

		return plainToInstance(WarehouseDbDto, prepareWarehouseDataForDb, {
			excludeExtraneousValues: true,
		});
	});

	// сохраним данные в БД по дню
	await wbWarehousesRepository.saveDailyData(warehouseListDtoForDb);

	// получаем все данные из БД в отсортированном виде день, коэффициент
	const warehousesData = await wbWarehousesRepository.findAndSorted(['*'], {
		columnName: 'box_delivery_and_storage_expr',
		order: 'asc',
	});

	if (warehousesData === undefined) {
		return;
	}

	// преобразовываем полученные данные с БД к обьекту
	const warehousesDataDbDto = warehousesData.map((warehouse) =>
		plainToInstance(WarehouseDbDto, warehouse),
	);

	const warehousesDataDto = warehousesDataDbDto.map((warehouse) =>
		plainToInstance(WarehouseDTO, warehouse.formatForBaseDto()),
	);

	const prepareGoogleSheetsData = warehousesDataDto.map((warehouse) =>
		Object.entries(warehouse),
	);

	for (const spreadsheetId of GOOGLE_SPREADSHEET_IDS) {
		const sheetExist = await googleSheetsService.sheetExists(
			spreadsheetId,
			SHEET_TITLE,
		);

		if (!sheetExist) {
			googleSheetsService.createList(spreadsheetId, SHEET_TITLE);
		}

		for (const data of prepareGoogleSheetsData) {
			await googleSheetsService.appendData(spreadsheetId, SHEET_TITLE, data);
		}
	}
}
