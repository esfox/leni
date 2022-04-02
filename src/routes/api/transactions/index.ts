import type { RequestHandler } from '@sveltejs/kit';
import { TransactionService } from 'src/services/TransactionService';

export const get: RequestHandler = async ({ url }) =>
{
  try
  {
    const page = Number(url.searchParams.get('page') || 0);
    const limit = Number(url.searchParams.get('limit') || 0);
    const transactions = await TransactionService.list(page, limit);
    return {
      body: transactions,
    };
  }
  catch(error)
  {
    console.error(error);
  }
};