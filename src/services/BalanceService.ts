import { TransactionsFields } from 'src/constants/database';
import { DatabaseService } from './DatabaseService';

export class BalanceService
{
  static async get()
  {
    const [result] = await DatabaseService.transactions()
      .sum(TransactionsFields.amount);

    return result.sum || 0;
  }
}