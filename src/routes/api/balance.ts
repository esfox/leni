import { authenticated } from '$lib/authenticated-endpoint';
import type { RequestHandler } from '@sveltejs/kit';
import { BalanceService } from 'src/services/BalanceService';

export const get: RequestHandler = async (event) => authenticated(event, async () =>
{
  try
  {
    const balance = await BalanceService.get(event.locals.userId);
    return { body: balance };
  }
  catch(error)
  {
    console.error(error);
    return { status: 500 };
  }
});
