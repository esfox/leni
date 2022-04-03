import type { RequestHandler, RequestHandlerOutput, ResponseBody } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit/types/private';
import jwt from 'jsonwebtoken';
import { env } from './env';

export const authenticated = async (
  event: RequestEvent<Record<string, string>>,
  handler: RequestHandler,
): Promise<RequestHandlerOutput<ResponseBody>> =>
{
  const { request } = event;
  const authorization = request.headers.get('authorization');
  if(!authorization)
    return { status: 401 };

  try
  {
    const decoded = jwt.verify(authorization, env.JWT_SECRET);
    if(!decoded || !decoded.sub)
      return { status: 401 };

    event.locals.userId = decoded.sub as string;
  }
  catch(error)
  {
    console.error(error);
    return { status: 401 };
  }

  return handler(event);
};
