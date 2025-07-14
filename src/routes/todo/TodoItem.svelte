<script lang="ts">
    let { todo, handleTodoToggle, handleDelete } = $props();
    let description = $derived(todo.description.length > 20 ? 
     `${todo.description.slice(0, 20)}...` : todo.description
    );
</script>

<div class="todo-item">
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
        >{description}</a>
    </span>
    <button
        class="delete-btn bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        aria-label="Mark as complete"
        onclick={async () => handleDelete(todo.id)}
    >Delete</button>
</div>

<style>
    .delete-btn {
		/* border: none;
		background: url(/remove.svg) no-repeat 50% 50%;
		background-size: 1rem 1rem;
		cursor: pointer;
		height: 100%;
		aspect-ratio: 1;
		opacity: 0.5;
		transition: opacity 0.2s; */
        margin-left: auto;
	}
    .todo-item {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        border-bottom: 1px solid #e5e7eb;
    }
</style>