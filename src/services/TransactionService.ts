import type { NewTransaction } from '$lib/interfaces';
import { TRANSACTION_LIST_LIMIT } from 'src/constants/common';
import { TransactionsFields } from 'src/constants/database';
import { DatabaseService } from 'src/services/DatabaseService';

export class TransactionService
{
  static whereUserId(userId: string)
  {
    return DatabaseService.transactions()
      .where({ [TransactionsFields.userId]: userId });
  }

  static async count(userId: string)
  {
    const [{ count }] = await TransactionService
      .whereUserId(userId)
      .count(TransactionsFields.id);

    return count;
  }

  static async list(userId: string, page = 1, limit = TRANSACTION_LIST_LIMIT)
  {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const records = await TransactionService
      .whereUserId(userId)
      .offset((page - 1) * limit)
      .limit(limit)
      .orderBy(TransactionsFields.date, 'desc');

    return records;
  }

  static async create(userId: string, transaction: NewTransaction)
  {
    const [record] = await TransactionService
      .whereUserId(userId)
      .insert({
        userId,
        ...transaction,
      })
      .returning('*');

    return record;
  }

  static async del(userId: string, transactionId: number)
  {
    const [record] = await TransactionService
      .whereUserId(userId)
      .and.where({ [TransactionsFields.id]: transactionId })
      .del()
      .returning('*');

    return record;
  }
}
