import { plainToInstance } from 'class-transformer';
import './app.config';
import './database/index';

import { getCurrentDataToString } from './helpers/get-current-date';
import { wbCommonApi } from './wildberries/api/common.api';
import { WarehouseDTO } from './wildberries/dto/warehouse/warehouse.dto';
import { tariffsBoxes } from './mockData/tariffsBox';
import { wbWarehousesRepository } from './wildberries/repository/warehouses.repository';
import { WarehouseDbDto } from './wildberries/dto/warehouse/warehouse-db.dto';

(async function app() {
	try {
		async function task() {
			// const currentDate = getCurrentDataToString();

			// const apiWbResponse = await wbCommonApi.getTariffsBoxByDate(currentDate);

			// const warehouseList = apiWbResponse.response.data.warehouseList;

			const warehouseList = tariffsBoxes.response.data.warehouseList;

			const warehouseListDto = warehouseList.map((warehouse) =>
				plainToInstance(WarehouseDTO, warehouse, {
					excludeExtraneousValues: true,
				}),
			);

			const warehouseListDtoForDb = warehouseListDto.map((warehouse) => {
				const prepareWarehouseDataForDb = warehouse.formatForDb();

				return plainToInstance(WarehouseDbDto, prepareWarehouseDataForDb, {
					excludeExtraneousValues: true,
				});
			});

			await wbWarehousesRepository.saveDailyData(warehouseListDtoForDb);

			const data = await wbWarehousesRepository.findAndSorted(['*'], {
				columnName: 'box_delivery_and_storage_expr',
				order: 'asc',
			});

			console.log(data);
		}

		task();
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
})();
