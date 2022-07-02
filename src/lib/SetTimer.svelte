<script>
  import { createEventDispatcher } from 'svelte';
  import { timer } from './stores';

  let minutes;
  const MAX_MINUTES = 20;
  const dispatch = createEventDispatcher();
  timer.subscribe(value => minutes = value)

  function decreaseMinutes() {
    timer.update(value => value - 1)
  }
  function increaseMinutes() {
    timer.update(value => value + 1)
  }
  function handleSet() {
    dispatch('set');
  }

</script>

<div >

  <button on:click={decreaseMinutes} disabled="{minutes === 0}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </button>

  <p >
    {minutes} min
  </p>

  <button on:click={increaseMinutes} disabled="{minutes >= MAX_MINUTES}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </button>

</div>

<div>
  <button disabled={minutes === 0} on:click={handleSet}>
    <span class="visually-hidden">Start timer</span>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="44" height="44" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </button>
</div>

<style>
    main {
        padding: 0rem 1rem;
    }

    main > svg {
        width: 100%;
        height: auto;
        display: block;
        margin: 0 auto 2rem;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    @supports (display: grid) {
        div {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            justify-content: initial;
            justify-items: center;
        }
    }

    button {
        width: max-content;
        font-size: 0.9rem;
        color: inherit;
        border: none;
        background: none;
        text-transform: capitalize;
    }

    button {
        text-decoration: underline;
    }

    button[disabled] {
        transform: scale(0);
    }
</style>
