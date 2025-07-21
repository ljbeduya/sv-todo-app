<script lang="ts">
  import { page } from "$app/state";
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Error</h1>
  <p class="mb-4">An error occurred while acessing the page.</p>
  <p class="mb-4">Error: {page?.error?.message}</p>
  <p class="mb-4">
    Please check the URL or return to the <a
      href="/"
      class="text-blue-500 hover:underline">home page</a
    >.
  </p>
</div>
