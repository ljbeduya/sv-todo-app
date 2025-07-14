<script lang="ts">
    import type { PageProps } from './$types';
    import TodoForm from '../TodoForm.svelte';

    let  { data, form } : PageProps = $props();
</script>

<TodoForm 
    description={data.todo.description}
    done={data.todo.done}
    saveActionPath="?/update" 
    deleteActionPath="?/delete"
    errorMessage={form?.error}
/>
