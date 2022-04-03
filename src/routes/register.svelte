<script>
  import { LoginFormAction } from 'src/constants/common';

  import LoginForm from 'src/components/Login/LoginForm.svelte';
</script>

<LoginForm action={LoginFormAction.Register} />
