<script>
  import { onMount } from 'svelte';
  import Quagga from 'quagga';
  import { createEventDispatcher } from 'svelte';
  import { get, set } from 'idb-keyval';

  let error = false;
  let dispatch = createEventDispatcher();
  let barcode = '';
  let attempts = 0;
  const MAX_ATTEMPTS = 3;

  async function handleBarcode(barcodeEvent) {
    console.log('BOB: ', barcodeEvent.codeResult)
    const barcode = barcodeEvent.codeResult.code;
    if (!barcode) {
      return;
    }
    const pastaFound = await get(barcode);
    attempts += 1;
    if (attempts > MAX_ATTEMPTS || pastaFound) {
      Quagga.offDetected(handleBarcode);
      dispatch('scan', barcodeEvent.codeResult.code);
    }
  }

  onMount(() => {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector("#barcode-scanner"),
          },
          numOfWorkers: 1,
          locate: true,
          decoder: {
            readers: ['ean_reader', 'ean_8_reader', 'upc_reader', 'code_128_reader']
          },
        },
        function (err) {
          if (err) {
            console.error(err);
            return;
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();
        }
      );
      Quagga.onDetected(handleBarcode)
    } else {
      error = true;
    }
  });

</script>


<div id="barcode-scanner"></div>

<style>
  :global(video) {
      width: 100%;
  }
</style>