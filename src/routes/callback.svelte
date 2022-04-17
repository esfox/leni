<script lang="ts">
  import { goto } from '$app/navigation';

  import { auth } from '$lib/authenticated-page';
  auth().subscribe((isLoggedIn) => {
    if (isLoggedIn) goto('/');
  });
</script>
