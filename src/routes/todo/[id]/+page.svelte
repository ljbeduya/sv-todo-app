<script lang="ts">
  import TodoForm from "../TodoForm.svelte";
  import { goto } from "$app/navigation";

  let { data, form } = $props();

  async function handleDelete(e: MouseEvent) {
    await fetch(`/todo/${data.todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    goto("/todo");
  }
</script>

<TodoForm
  description={data.todo.description}
  done={data.todo.done}
  saveActionPath="?/update"
  errorMessage={form?.error}
  {handleDelete}
/>
