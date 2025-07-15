<script lang="ts">
    let { todo, handleTodoToggle, handleDelete } = $props();
    let description = $derived(todo.description.length > 20 ? 
     `${todo.description.slice(0, 30)}...` : todo.description
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
        class="delete-btn"
        aria-label="Mark as complete"
        onclick={async () => handleDelete(todo.id)}
    ><img src="/remove.svg" alt="404 Not Found" class="w-full max-w-md mx-auto mb-4" /></button>
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
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        border-bottom: 1px solid #e5e7eb;
        width: 100%;
    }
</style>