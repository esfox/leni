import { authenticated } from '$lib/authenticated-endpoint';
import type { RequestHandler } from '@sveltejs/kit';
import { TransactionService } from 'src/services/TransactionService';

export const del: RequestHandler = async (event) => authenticated(event, async ({ params, locals }) =>
{
  try
  {
    const deletedTransaction = await TransactionService.del(locals.userId, Number(params.id));
    return { body: deletedTransaction };
  }
  catch(error)
  {
    console.error(error);
    return { status: 500 };
  }
});
