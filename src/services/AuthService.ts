import { goto } from '$app/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL as string,
  import.meta.env.VITE_SUPABASE_PUBLIC_KEY as string,
);

export class AuthService
{
  static getUser()
  {
    const user = supabase.auth.user();
    if(!user)
      goto('/login');

    return user;
  }

  static getAccessToken()
  {
    const session = supabase.auth.session();
    return session?.access_token;
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

