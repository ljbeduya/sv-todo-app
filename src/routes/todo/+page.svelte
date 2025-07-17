<script lang="ts">
  import { goto, invalidate } from "$app/navigation";
  import TodoItem from "./TodoItem.svelte";
  import { slide, fly } from "svelte/transition";

  let { data } = $props();

  let showCompleted = $state(false);
  let doSearch = $state(false);

  let searchKey = $state("");
  let todos = $state(data?.todos ?? []);
  let originalTodos = [...(data?.todos ?? [])];

  $effect(() => {
    if (data?.todos) {
      todos = data.todos;
    }
  });

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
  <title>To Do</title>
  <meta
    name="todo"
    content="A to do app"
  />
</svelte:head>

<div class="text-column">
  <h1>To Do List</h1>
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
        class="search-field flex items-center"
        transition:slide={{ axis: "x", duration: 400 }}
      >
        <input
          type="text"
          bind:value={searchKey}
          placeholder="Search todos..."
          class="border border-gray-300 rounded px-2 py-1 mb-4 w-full max-w-md"
          autocomplete="off"
          oninput={() => {
            const filteredTodos = originalTodos.filter((todo) =>
              todo.description?.toLowerCase().includes(searchKey)
            );
            todos = filteredTodos;
          }}
        />
      </div>
    {/if}
    <button
      type="button"
      class="search-btn text-white py-2 px-4 rounded"
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
    {#if todos.length === 0}
      <p class="text-gray-500">You have no todos yet.</p>
    {:else}
      <ul>
        {#each todos.filter((todo) => !todo.done) as todo (todo.id)}
          <li
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
        class="completed-btn bg-green-300 text-black py-2 px-4 rounded hover:bg-green-400"
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
          {#each todos.filter((todo) => todo.done) as todo (todo.id)}
            <li
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
          {#if todos.filter((todo) => todo.done).length === 0}
            <p class="text-gray-500">No completed todos yet.</p>
          {/if}
        </ul>
      </div>
    {/if}
  </div>
</div>

<style>
  li {
    border: 1px solid;
    margin: 0 3px 3px 3px;
    padding: 1px;
  }
  .create-btn,
  .search-btn,
  .completed-btn {
    margin-bottom: 5px;
  }
  .text-column {
    width: 20rem;
  }
  .search-btn {
    transition: width 0.5s;
  }
  .search-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .search-field input {
    margin-bottom: 5px;
    display: block;
  }
</style>
