<script>
  import Timer from './lib/Timer.svelte';
  import SetTimer from './lib/SetTimer.svelte';
  import BarcodeScanner from './lib/BarcodeScanner.svelte';

  import { timer } from './lib/stores';

  let timerValue;
  timer.subscribe(value => timerValue = value);

  const STATES = {
    SCAN: 'scan',
    TIMER: 'timer',
    SET_TIMER: 'set-timer',
  }
  let state = STATES.SCAN; // TODO
  let barcode = '';

  function getTimerForBarcode() {
    // TODO
    return false;
  }

  function handleBarcode(barcodeEvent) {
    // TODO: check storage for pasta
    barcode = barcodeEvent.detail;
    console.log('BARCODE: ', barcode)

    const pastaFound = getTimerForBarcode();
    if (pastaFound) {
      state = STATES.TIMER;
    } else {
      state = STATES.SET_TIMER;
    }
  }

  function handleSetTimer() {
    // TODO: save pasta with timer
    state = STATES.TIMER;
    console.log('TIMER SET TO: ', timerValue)
  }
</script>

<main>
  {#if state === STATES.SET_TIMER}
    <SetTimer on:set={handleSetTimer} />
  {:else if state === STATES.TIMER}
    <Timer />
  {:else }
    <BarcodeScanner on:scan={handleBarcode}/>
  {/if}
</main>

<style>
    	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		min-height: 100vh;
		color: hsl(0, 0%, 98%);
		background: hsl(240, 80%, 6%);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
			Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
	}

	:global(.visually-hidden:not(:focus):not(:active)) {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	div {
    max-width: 300px;
    margin: 1rem auto;
    padding: 1rem;
  }
</style>
