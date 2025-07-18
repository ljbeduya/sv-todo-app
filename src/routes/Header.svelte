<script lang="ts">
  import { page } from "$app/state";
  import github from "$lib/images/github.svg";
  import moon from "$lib/images/moon_icon.png";
  import sun from "$lib/images/sun_icon.png";

  let isDarkMode = $state(false);

  function toggleDarkMode() {
    document.documentElement.classList.toggle("dark");
    isDarkMode = !isDarkMode;
  }
</script>

<header class="header flex justify-between">
  <div class="corner">
    <a
      href="https://github.com/ljbeduya/sv-todo-app"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center justify-center"
    >
      <img
        src={github}
        alt="GitHub"
        class="dark:bg-white rounded-full border-1 size-8"
      />
    </a>
  </div>

  <nav class="nav flex justify-center">
    <svg
      viewBox="0 0 2 3"
      aria-hidden="true"
    >
      <path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
    </svg>
    <ul>
      <li
        aria-current={page.url.pathname.startsWith("/todo")
          ? "page"
          : undefined}
      >
        <a href="/todo">To Do</a>
      </li>
      <li aria-current={page.url.pathname === "/about" ? "page" : undefined}>
        <a href="/about">About</a>
      </li>
    </ul>
    <svg
      viewBox="0 0 2 3"
      aria-hidden="true"
    >
      <path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
    </svg>
  </nav>

  <div class="corner flex justify-center items-center">
    <button
      type="button"
      class="border-1 flex justify-center items-center rounded-full bg-none size-8"
      onclick={toggleDarkMode}
    >
      <img
        src={isDarkMode ? sun : moon}
        alt="Toggle Dark Mode"
        class="icon hover:bg-red-100 dark:hover:bg-yellow-50 rounded-full size-7 p-0.5"
      />
    </button>
  </div>
</header>

<style>
  .corner {
    width: 3em;
    height: 3em;
  }

  .corner a {
    width: 100%;
    height: 100%;
  }

  nav {
    --background: rgba(255, 255, 255, 0.7);
  }

  svg {
    width: 2em;
    height: 3em;
    display: block;
  }

  path {
    fill: var(--background);
  }

  ul {
    position: relative;
    padding: 0;
    margin: 0;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    background: var(--background);
    background-size: contain;
  }

  li {
    position: relative;
    height: 100%;
  }

  li[aria-current="page"]::before {
    --size: 6px;
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: calc(50% - var(--size));
    border: var(--size) solid transparent;
    border-top: var(--size) solid var(--color-theme-1);
  }

  nav a {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 0.5rem;
    color: var(--color-text);
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: color 0.2s linear;
  }

  a:hover {
    color: var(--color-theme-1);
  }
</style>
