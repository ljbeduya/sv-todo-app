<script lang="ts">
  import remove from "$lib/images/remove.svg";

  let { todo, handleTodoToggle, handleDelete } = $props();
  let description = $derived(
    todo.description.length > 30
      ? `${todo.description.slice(0, 30)}...`
      : todo.description
  );
</script>

<div
  class="todo-item flex items-center justify-end max-w-md rounded hover:bg-red-100 dark:hover:text-black dark:hover:bg-yellow-50 gap-2"
>
  <input
    type="checkbox"
    checked={todo.done}
    onchange={async (e) => {
      await handleTodoToggle(todo.id, e.currentTarget.checked);
    }}
  />
  <span>
    <a
      href={`/todo/${todo.id}`}
      class:text-gray-500={todo.done}
      class:line-through={todo.done}
    >
      {description}
    </a>
  </span>
  <button
    type="button"
    class="delete-btn"
    aria-label="Mark as complete"
    onclick={async () => await handleDelete(todo.id)}
  >
    <img
      src={remove}
      alt="404 Not Found"
      class="w-full max-w-md mx-auto mb-4"
    />
  </button>
</div>

<style>
  .delete-btn {
    border: none;
    cursor: pointer;
    aspect-ratio: 1;
    opacity: 0.5;
    transition: opacity 0.2s;
    margin-left: auto;
  }
  .delete-btn img {
    width: 1rem;
    height: 1rem;
    margin: auto;
  }
  .todo-item {
    padding: 0.5rem;
  }
</style>
