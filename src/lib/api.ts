import type { NewTransaction, Transaction } from '$lib/interfaces';
import ky from 'ky';
import { TRANSACTION_LIST_LIMIT } from 'src/constants/common';

const api = ky.create({ prefixUrl: '/api' });
const transactions = ky.create({ prefixUrl: '/api/transactions' });

export class API
{
  static getBalance(): Promise<number>
  {
    return api.get('balance').json();
  }

  static getTransactions(page = 1, limit = TRANSACTION_LIST_LIMIT): Promise<Transaction[]>
  {
    return transactions.get('', {
      searchParams: {
        page,
        limit,
      }
    }).json();
  }

  static addTransaction(transaction: NewTransaction): Promise<Transaction>
  {
    return transactions.post('create', {
      json: transaction
    }).json();
  }
}
