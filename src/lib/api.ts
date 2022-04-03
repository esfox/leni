import type { NewTransaction, Transaction } from '$lib/interfaces';
import ky from 'ky';
import { TRANSACTION_LIST_LIMIT } from 'src/constants/common';
import { AuthService } from 'src/services/AuthService';

const api = ky.create({
  prefixUrl: '/api',
  hooks: {
    beforeRequest: [
      (request) =>
      {
        const accessToken = AuthService.getAccessToken();
        if(accessToken)
          request.headers.set('authorization', accessToken);
      },
    ],
  }
});

export class API
{
  static getBalance(): Promise<number>
  {
    return api.get('balance').json();
  }

  static getTransactions(page = 1, limit = TRANSACTION_LIST_LIMIT): Promise<Transaction[]>
  {
    return api.get('transactions', {
      searchParams: {
        page,
        limit,
      }
    }).json();
  }

  static addTransaction(transaction: NewTransaction): Promise<Transaction>
  {
    return api.post('transactions/create', {
      json: transaction
    }).json();
  }
}
