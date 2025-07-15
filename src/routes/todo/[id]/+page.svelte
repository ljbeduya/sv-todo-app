<script lang="ts">
  import TodoForm from "../TodoForm.svelte";

  let { data, form } = $props();
</script>

<TodoForm
  description={data.todo.description}
  done={data.todo.done}
  saveActionPath="?/update"
  deleteActionPath="?/delete"
  errorMessage={form?.error}
/>
