<script lang="ts">
  import TodoForm from "../TodoForm.svelte";

  let { form } = $props();
</script>

<TodoForm
  saveActionPath="?/create"
  errorMessage={form?.error}
/>
