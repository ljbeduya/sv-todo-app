<script lang="ts">
  import TodoForm from "../TodoForm.svelte";

  let { form } = $props();
</script>

<svelte:head>
  <title>Add Todo</title>
  <meta
    name="description"
    content="Adding todo"
  />
</svelte:head>

<TodoForm
  saveActionPath="?/create"
  errorMessage={form?.error}
/>
