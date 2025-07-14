<script lang="ts">
    import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import type { error } from '@sveltejs/kit';

    let { 
        description = '', 
        done = false, 
        saveActionPath,
        deleteActionPath = null,
        errorMessage = null
    } = $props();
</script>

<div class="text-column">
    {#if errorMessage}
        <div class="error-message text-white bg-red-500 p-2 rounded mb-4">
            {errorMessage}
        </div>
    {/if}
    <form class="space-y-4" method="POST" action="{saveActionPath}" use:enhance >
        <label for="description" class="block text-sm font-medium text-gray-700">
            <div class="description-label flex items-center">
                <h2>Add a todo:</h2>
                <button 
                    class="back-btn bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-600"
                    onclick={(e) => {
                        e.preventDefault();
                        goto('/todo');
                    }}
                >Back</button>
            </div>
            <br />
            <textarea
                class="description-input"
                name="description"
                autocomplete="off"
                required
                disabled={done}
                class:text-gray-500={done}
                class:bg-gray-300={done}
            >{description ?? ''}</textarea>
        </label>
        <div class="button-actions">
            {#if deleteActionPath}
                <button
                    formaction="{deleteActionPath}"
                    class="btn-secondary bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 delete-btn"
                >Delete</button>
            {/if}
            <button 
                class="btn-primary bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 save-btn"
            >Save</button>
        </div>
    </form>
</div>

<style>
    .description-input {
        border: 1px solid #ccc; 
        height: 150px; 
        padding: 8px; 
        width: 400px; 
        resize: vertical;
        text-wrap: initial;
        overflow-y: auto;
    }
    .button-actions {
        display: flex;
        justify-content: flex-end;
    }
    .delete-btn {
        margin-right: auto;
    }
    .back-btn {
        margin-left: auto;
    }
</style>