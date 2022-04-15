import { env } from '$lib/env';
import pkg, { Knex } from 'knex';
import pg from 'pg';

pg.types.setTypeParser(pg.types.builtins.INT8, (value: string) => Number(value));
pg.types.setTypeParser(pg.types.builtins.FLOAT8, (value: string) => Number(value));
pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value: string) => Number(value));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const { knex } = pkg;
export const database: Knex = knex({
  client: 'pg',
  connection: env.DATABASE_CONNECTION_STRING,
});

export class DatabaseService
{
  static transactions = () => database('transactions');
}
