<script lang="ts">
  import Header from "./Header.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<div class="app text-black bg-gray-200 dark:text-white dark:bg-black">
  <Header />

  <main>
    {@render children()}
  </main>

  <footer>
    <p>&copy; 2025 To Do App. All rights reserved.</p>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
