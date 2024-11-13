import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
	await knex.schema.createTable(
		'warehouses',
		function (table: Knex.CreateTableBuilder) {
			table.increments('id').primary();

			table.timestamp('created_at').defaultTo(knex.fn.now());
			table.timestamp('updated_at').defaultTo(knex.fn.now());

			table.date('date').defaultTo(knex.raw('CURRENT_DATE')).notNullable();

			table.string('warehouse_name').notNullable();
			table.integer('box_delivery_and_storage_expr').notNullable();
			table.string('box_delivery_base');
			table.string('box_delivery_liter');
			table.string('box_storage_base');
			table.string('box_storage_liter');

			// Добавляем уникальный составной индекс на "date" и "warehouse_name"
			table.unique(['date', 'warehouse_name']);
		},
	);
}

export async function down(knex: Knex): Promise<void> {
	await knex.schema.dropTableIfExists('warehouses');
}
