import type { NewTransaction, Transaction } from '$lib/interfaces';
import ky from 'ky';
import { TRANSACTION_LIST_LIMIT } from 'src/constants/common';
import { AuthService } from 'src/services/AuthService';
import { Router } from './router';

const api = ky.create({
  prefixUrl: '/api',
  timeout: 60000,
  hooks: {
    beforeRequest: [
      (request) =>
      {
        const accessToken = AuthService.getAccessToken();
        if(accessToken)
          request.headers.set('authorization', accessToken);
      },
    ],
    afterResponse: [
      async (request, options, response) =>
      {
        if(response.status !== 401)
          return response;

        const session = await AuthService.refreshAccessToken();
        if(!session)
          return Router.toLogin();

        request.headers.set('authorization', session.access_token);
        return ky(request);
      }
    ]
  }
});

export class API
{
  static getBalance(): Promise<number>
  {
    return api.get('balance').json();
  }

  static getTransactions(page = 1, limit = TRANSACTION_LIST_LIMIT): Promise<{
    total: number,
    transactions: Transaction[],
  }>
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
      json: transaction,
    }).json();
  }

  static deleteTransaction(transactionId: number): Promise<Transaction>
  {
    return api.delete(`transactions/delete/${transactionId}`).json();
  }
}
