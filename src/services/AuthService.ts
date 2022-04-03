import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_PUBLIC_ANON_KEY as string,
);

export class AuthService
{
  static isLoggedIn()
  {
    return supabase.auth.session();
  }

  static async login(email: string, password: string)
  {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if(error)
      throw error;

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
    return supabase.auth.signOut();
  }
}

