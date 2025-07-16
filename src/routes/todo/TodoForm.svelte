<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";

  let {
    description = "",
    done = false,
    saveActionPath,
    errorMessage = null,
    handleBack = (e: MouseEvent) => {
      goto("/todo");
    },
    handleDelete = null,
  } = $props();
</script>

<div class="text-column">
  {#if errorMessage}
    <div class="error-message text-white bg-red-500 p-2 rounded mb-4">
      {errorMessage}
    </div>
  {/if}
  <form
    class="space-y-4"
    method="POST"
    action={saveActionPath}
    use:enhance
  >
    <label
      for="description"
      class="block text-sm font-medium text-gray-700"
    >
      <div class="description-label flex items-center">
        <h2>Add a todo:</h2>
        <button
          class="back-btn bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-600"
          onclick={(e) => handleBack(e)}
          type="button"
        >
          Back
        </button>
      </div>
      <br />
      <textarea
        class="description-input"
        name="description"
        autocomplete="off"
        required
        disabled={done}
        class:text-gray-500={done}
        class:bg-gray-300={done}>{description ?? ""}</textarea
      >
    </label>
    <div class="button-actions">
      {#if handleDelete}
        <button
          type="button"
          onclick={(e) => handleDelete(e)}
          class="btn-secondary bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 delete-btn"
        >
          Delete
        </button>
      {/if}
      <button
        type="submit"
        class="btn-primary text-white py-2 px-4 rounded save-btn"
        disabled={done}
        class:bg-blue-500={!done}
        class:hover:bg-blue-600={!done}
        class:bg-blue-300={done}
      >
        Save
      </button>
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
