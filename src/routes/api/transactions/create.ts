import type { NewTransaction } from '$lib/interfaces';
import type { RequestHandler } from '@sveltejs/kit';
import { TransactionService } from 'src/services/TransactionService';

export const post: RequestHandler = async ({ request }) =>
{
  try
  {
    const body = await request.json();
    const transaction = body as NewTransaction;
    const result = await TransactionService.create(transaction);
    return {
      body: result,
    };
  }
  catch(error)
  {
    console.error(error);
  }
};