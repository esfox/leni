import { authenticated } from '$lib/authenticated-endpoint';
import type { NewTransaction } from '$lib/interfaces';
import type { RequestHandler } from '@sveltejs/kit';
import { TransactionService } from 'src/services/TransactionService';

export const put: RequestHandler = async (event) => authenticated(event, async ({ request, params, locals }) =>
{
  try
  {
    const newTransaction: NewTransaction = await request.json();
    const updatedTransaction = await TransactionService.edit(
      locals.userId,
      Number(params.id),
      newTransaction,
    );

    return { body: updatedTransaction };
  }
  catch(error)
  {
    console.error(error);
    return { status: 500 };
  }
});

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
