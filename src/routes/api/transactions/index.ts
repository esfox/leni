import { authenticated } from '$lib/authenticated-endpoint';
import type { RequestHandler } from '@sveltejs/kit';
import { TRANSACTION_LIST_LIMIT } from 'src/constants/common';
import { TransactionService } from 'src/services/TransactionService';

export const get: RequestHandler = async (event) => authenticated(event, async ({ url }) =>
{
  try
  {
    const page = Number(url.searchParams.get('page') || 1);
    const limit = Number(url.searchParams.get('limit') || TRANSACTION_LIST_LIMIT);
    const transactions = await TransactionService.list(event.locals.userId, page, limit);
    return { body: transactions };
  }
  catch(error)
  {
    console.error(error);
    return { status: 500 };
  }
});
