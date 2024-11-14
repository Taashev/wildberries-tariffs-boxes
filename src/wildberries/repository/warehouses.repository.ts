import { Knex } from 'knex';
import { knexClient } from '../../database';
import { WarehouseDbDto } from '../dto/warehouse/warehouse-db.dto';
import { getCurrentDataToString } from '../../helpers/get-current-date';

type SelectParam = (keyof WarehouseDbDto)[] | ['*'];
type SortedParam = {
	columnName: keyof WarehouseDbDto;
	order: 'asc' | 'desc';
};

export class WBWarehousesRepository {
	private _table: string = 'warehouses';

	constructor(private _dbClient: Knex) {}

	public async findAndSorted(select: SelectParam, sortedParam: SortedParam) {
		try {
			return await this._dbClient
				.select<WarehouseDbDto[]>(select)
				.from(this._table)
				.orderBy('date', 'asc')
				.orderBy(sortedParam.columnName, sortedParam.order);
		} catch (error) {
			console.error(error);
		}
	}

	public async saveDailyData(warehousesDbDto: WarehouseDbDto[]) {
		try {
			return await this._dbClient(this._table)
				.insert(warehousesDbDto)
				.onConflict<keyof WarehouseDbDto>(['date', 'warehouse_name'])
				.merge({
					updated_at: this._dbClient.fn.now(),
				});
		} catch (error) {
			console.error(error);
		}
	}
}

export const wbWarehousesRepository = new WBWarehousesRepository(knexClient);
