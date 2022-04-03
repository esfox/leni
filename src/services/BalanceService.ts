import { TransactionsFields } from 'src/constants/database';
import { TransactionService } from './TransactionService';

export class BalanceService
{
  static async get(userId: string)
  {
    const [result] = await TransactionService
      .whereUserId(userId)
      .sum(TransactionsFields.amount)
      .where({ [TransactionsFields.userId]: userId });

    return result.sum || 0;
  }
}