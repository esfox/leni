import { Router } from '$lib/router';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY as string,
);

const refreshTokenKey = 'refresh_token';

export class AuthService
{
  static checkLogin(callback: (isLoggedIn: boolean) => void)
  {
    supabase.auth.onAuthStateChange(async (event, session) =>
    {
      if(event === 'SIGNED_IN')
      {
        localStorage.setItem(refreshTokenKey, session.refresh_token);
        return callback(true);
      }
    });

    const accessToken = AuthService.getAccessToken();
    if(accessToken)
      return callback(true);

    AuthService.refreshAccessToken().then(session =>
    {
      if(!session)
        return Router.toLogin();

      callback(true);
    });
  }

  static getAccessToken()
  {
    const session = supabase.auth.session();
    return session?.access_token;
  }

  static async refreshAccessToken()
  {
    const currentSession = supabase.auth.session();
    const refreshToken = currentSession?.refresh_token ||
      localStorage.getItem(refreshTokenKey);

    if(!refreshToken)
      return;

    const { session } = await supabase.auth.setSession(refreshToken);
    if(!session)
      return;

    localStorage.setItem(refreshTokenKey, session.refresh_token);
    return session;
  }

  static async login({
    email,
    password,
    withGoogle,
  }: {
    email?: string;
    password?: string;
    withGoogle?: boolean;
  })
  {
    if(withGoogle)
      return supabase.auth.signIn({ provider: 'google' }, { redirectTo: `${location.origin}/callback` });

    const { user, session, error } = await supabase.auth.signIn({ email, password });
    if(error)
      throw error;

    localStorage.setItem(refreshTokenKey, session.refresh_token);
    return user;
  }


  static async register(email: string, password: string)
  {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if(error)
      throw error;

    return user;
  }

  static async logout()
  {
    localStorage.removeItem(refreshTokenKey);
    return supabase.auth.signOut();
  }
}

