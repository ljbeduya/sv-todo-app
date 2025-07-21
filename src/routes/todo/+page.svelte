<script lang="ts">
  import { goto, invalidate } from "$app/navigation";
  import TodoItem from "./TodoItem.svelte";
  import { slide, fly } from "svelte/transition";

  let { data } = $props();

  let showCompleted = $state(false);
  let doSearch = $state(false);

  let searchKey = $state("");
  let filteredTodos = $derived(
    data.todos.filter((todo) =>
      todo.description?.toLowerCase().includes(searchKey)
    )
  );
  let incompleteTodos = $derived(filteredTodos.filter((todo) => !todo.done));
  let completedTodos = $derived(filteredTodos.filter((todo) => todo.done));

  function handleCreate() {
    goto("/todo/create");
  }

  async function handleTodoToggle(todoId: string, done: boolean) {
    await fetch(`/todo/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done }),
    });
    invalidate("todo:todos");
  }

  async function handleDelete(todoId: string) {
    await fetch(`/todo/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    invalidate("todo:todos");
  }
</script>

<svelte:head>
  <title>Todo List</title>
  <meta
    name="description"
    content="My To Dos"
  />
</svelte:head>

<div class="text-column">
  <h1>My To Dos</h1>
  <button
    type="button"
    class="create-btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    onclick={handleCreate}
  >
    Add a todo
  </button>
  <div class="search-container flex items-center mb-4">
    {#if doSearch}
      <div
        class="search-field flex-auto items-center"
        transition:slide={{ axis: "x", duration: 400 }}
      >
        <input
          type="text"
          bind:value={searchKey}
          placeholder="Search todos..."
          class="rounded px-1 py-1 mb-2 max-w-md gap-3 dark:bg-gray-700 dark:text-white"
          autocomplete="off"
        />
      </div>
    {/if}
    <button
      type="button"
      class="search-btn text-white py-2 px-4 rounded flex-auto"
      onclick={() => (doSearch = !doSearch)}
      disabled={!data.todos.length}
      class:bg-gray-400={data.todos.length}
      class:hover:bg-gray-600={data.todos.length}
      class:bg-gray-300={!data.todos.length}
      style="width: {doSearch ? 'auto' : '100%'}"
    >
      {!doSearch ? "Show" : "Hide"} Search
    </button>
  </div>
  <div class="todo-list">
    {#if incompleteTodos.length === 0}
      {#if !searchKey}
        <p class="text-gray-500">You have no todos yet.</p>
      {:else}
        <p class="text-gray-500">No matching incomplete todos found.</p>
      {/if}
    {:else}
      <ul>
        {#each incompleteTodos as todo (todo.id)}
          <li
            class="rounded border-1"
            in:fly={{ y: 20, duration: 400 }}
            out:slide={{ duration: 300 }}
          >
            <TodoItem
              {todo}
              {handleTodoToggle}
              {handleDelete}
            />
          </li>
        {/each}
      </ul>
    {/if}
  </div>
  <br />
  <div class="completed-container">
    <div class="completed-header flex justify-between items-center">
      <span>Completed Todos</span>
      <button
        type="button"
        class="completed-btn bg-green-400 text-white py-2 px-4 rounded hover:bg-green-600"
        onclick={() => (showCompleted = !showCompleted)}
      >
        {!showCompleted ? "Show" : "Hide"}
      </button>
    </div>
    {#if showCompleted}
      <div
        class="completed-todos"
        transition:slide
      >
        <ul>
          {#each completedTodos as todo (todo.id)}
            <li
              class="rounded border-1"
              in:fly={{ y: 20, duration: 400 }}
              out:slide={{ duration: 300 }}
            >
              <TodoItem
                {todo}
                {handleTodoToggle}
                {handleDelete}
              />
            </li>
          {/each}
          {#if completedTodos.length === 0}
            {#if !searchKey}
              <p class="text-gray-500">No completed todos yet.</p>
            {:else}
              <p class="text-gray-500">No matching completed todos found.</p>
            {/if}
          {/if}
        </ul>
      </div>
    {/if}
  </div>
</div>

<style>
  li {
    margin-bottom: 0.3rem;
    padding: 0.1rem;
  }
  button {
    margin-bottom: 0.4rem;
  }
  .text-column {
    width: 20rem;
  }
</style>
