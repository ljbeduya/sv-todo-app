<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import type { PageProps } from './$types';
	import TodoItem from './TodoItem.svelte';
	import { slide, fly } from 'svelte/transition';
	
	let { data } : PageProps = $props();

	let showCompleted = $state(false);
	let doSearch = $state(false);

	let searchKey = $state('');

	let originalTodos = [...data.todos];

	function handleCreate() {
		goto('/todo/create')
	}

	async function handleTodoToggle(todoId: string, done: boolean) {
		await fetch(`/todo/${todoId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ done })
		});
		invalidate('app:todolist');
	}

	async function handleDelete(todoId: string) {
		await fetch(`/todo/${todoId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		invalidate('app:todolist');
	}
</script>

<svelte:head>
	<title>To Do List</title>
	<meta name="todo" content="A to do list app" />
</svelte:head>

<div class="text-column">
	<h1>To Do List</h1>
	<button
		class="create-btn bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" 
		onclick={handleCreate}
	>Add a todo</button>
	<button 
		class="search-btn text-white py-2 px-4 rounded" 
		onclick={() => doSearch = !doSearch}
		disabled={!data.todos.length}
		class:bg-gray-400={data.todos.length}
		class:hover:bg-gray-600={data.todos.length}
		class:bg-gray-300={!data.todos.length}
	>{ !doSearch ? 'Show' : 'Hide' } Search</button>
	{#if doSearch}
		<div transition:slide>
			<input 
				type="text"
				bind:value={searchKey}
				placeholder="Search todos..." 
				class="border border-gray-300 rounded px-2 py-1 mb-4 w-full max-w-md"
				autocomplete="off"
				oninput={() => {
					const filteredTodos = originalTodos.
						filter(todo => todo.description?.toLowerCase().includes(searchKey));

					data = {
						...data,
						todos: filteredTodos
					};
				}}
			/>	
		</div>
	{/if}
	{#if data.todos.length === 0}
		<p class="text-gray-500">You have no todos yet.</p>
	{:else}
		<div class="todo-items">
			<ul>
				{#each data.todos.filter(todo => !todo.done) as todo (todo.id)}
					<li in:fly={{ y: 20, duration: 400 }} out:slide={{ duration: 300 }}>
						<TodoItem {todo} {handleTodoToggle} {handleDelete} />
					</li>
				{/each}
			</ul>
		</div>
	{/if}
	<br />
	<div class="completed-todos flex justify-between items-center">
		<span>Completed Todos</span>
		<button
			class="completed-btn bg-green-300 text-black py-2 px-4 rounded hover:bg-green-400"
			onclick={() => showCompleted = !showCompleted}
		>{ !showCompleted ? 'Show' : 'Hide' }</button>
	</div>
	{#if showCompleted}
		<div transition:slide>
			<ul>
				{#each data.todos.filter(todo => todo.done) as todo (todo.id)}
					<li in:fly={{ y: 20, duration: 400 }} out:slide={{ duration: 300 }}>
						<TodoItem {todo} {handleTodoToggle} {handleDelete} />
					</li>
				{/each}
				{#if data.todos.filter(todo => todo.done).length === 0}
					<p class="text-gray-500">No completed todos yet</p>
				{/if}
			</ul>
		</div>
	{/if}
</div>

<style>
	li {
		border: 1px solid;
		margin: 0 3px 3px 3px;
		padding: 1px;
	}
	.create-btn, .search-btn, .completed-btn {
		margin-bottom: 5px;
	}
	.text-column {
		width: 20rem;
	}
</style>