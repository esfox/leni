import { authenticated } from '$lib/authenticated-endpoint';
import type { NewTransaction } from '$lib/interfaces';
import type { RequestHandler } from '@sveltejs/kit';
import { TransactionService } from 'src/services/TransactionService';

export const post: RequestHandler = async (event) => authenticated(event, async ({ request }) =>
{
  try
  {
    const transaction: NewTransaction = await request.json();
    const createdTransaction = await TransactionService.create(event.locals.userId, transaction);
    return { body: createdTransaction };
  }
  catch(error)
  {
    console.error(error);
    return { status: 500 };
  }
});
