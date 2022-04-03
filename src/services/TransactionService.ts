import type { NewTransaction } from '$lib/interfaces';
import { TRANSACTION_LIST_LIMIT } from 'src/constants/common';
import { TransactionsFields } from 'src/constants/database';
import { DatabaseService } from 'src/services/DatabaseService';

export class TransactionService
{
  static async list(page = 1, limit = TRANSACTION_LIST_LIMIT)
  {
    const records = await DatabaseService.transactions()
      .offset(page - 1)
      .limit(limit)
      .orderBy(TransactionsFields.date, 'desc');

    return records;
  }

  static async create(transaction: NewTransaction)
  {
    const [record] = await DatabaseService.transactions()
      .insert(transaction)
      .returning('*');

    return record;
  }
}
