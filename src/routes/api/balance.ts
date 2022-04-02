import type { RequestHandler } from '@sveltejs/kit';
import { BalanceService } from 'src/services/BalanceService';

export const get: RequestHandler = async () =>
{
  try
  {
    const result = await BalanceService.get();
    return {
      body: result,
    };
  }
  catch(error)
  {
    console.error(error);
  }
};