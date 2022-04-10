<script>
  import { Router } from '$lib/router';
  import { AuthService } from 'src/services/AuthService';
  import 'virtual:windi.css';
  import '../styles/app.scss';

  const logout = async () => {
    await AuthService.logout();
    Router.toLogin();
  };
</script>

<nav class="sticky flex justify-between top-0 bg-green-600 text-white px-4 py-3 z-10">
  <h1 class="text-2xl font-bold">Leni</h1>
  <button on:click={logout}>Logout</button>
</nav>
