import { goto } from '$app/navigation';

export class Router
{
  static toLogin()
  {
    goto('/login');
  }
}
