<script>
    import { onMount } from 'svelte';
    import Box from './Box.svelte';

    // generation
    let text = $state("");
    let input = $state("");
    let messages = $state([]);
    let results = $state([]);

    let status = $state("");

    let isRunning = $state();
    let tps = $state();
    let numTokens = $state();

    let error = $state();
    let round = $state(0);

    let myWorker;
    let container;

    onMount(async () => {

        if (window.Worker) {
            const MyWorker = await import('$lib/worker.js?worker');
            myWorker = new MyWorker.default(); 
            myWorker.postMessage({ type: "check" });

            isRunning = false;

            const onMessageReceived = (e) => {
                status = e.data.status;

                switch (e.data.status) {
                    case "loading":
                        // load model file
                        console.log(e.data.data); 
                        break;

                    case "initiate":
                        break;

                    case "progress":
                        // load model file - in progress
                        document.querySelector("#loading").textContent = `Loading ${e.data.file} ${(e.data.total / Math.pow(1024, 3)).toFixed(2)} GB ${e.data.progress.toFixed(2)}%`;

                        break;

                    case "done":
                        // model file loaded
                        break;

                    case "ready":
                        // pipeline ready: the worker is ready to accept messages.
                        break;

                    case "start":
                        // start generation
                        isRunning = true;
                        text = "";
                        tps = null;
                        numTokens = null;
                        break;

                    case "update":
                        // generation update: update the output text.
                        tps = e.data.tps;
                        numTokens = e.data.numTokens;
                        const output = e.data.output;

                        document.querySelector("#loading").textContent = `Generated ${numTokens} tokens in ${(numTokens / tps).toFixed(2)} seconds.`;

                        messages = [...messages, output];
                    
                        break;

                    case "complete":
                        // generation complete: re-enable the "generate" button
                        isRunning = false;
                        input = "";
                        results = [...results, messages.join(" ")];
                        round = round + 1;

                        messages = [];

                        break;

                    case "error":
                        error = e.data.data;
                        break;
                }
            };

            const onErrorReceived = (e) => {
                console.error("worker error:", e);
            };

            myWorker.addEventListener("message", onMessageReceived);
            myWorker.addEventListener("error", onErrorReceived);

            return () => {
                myWorker.removeEventListener("message", onMessageReceived);
                myWorker.removeEventListener("error", onErrorReceived);
            };
        }
    });
  
    $effect(() => {
        const prompt = [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: input },
        ];

        if (prompt.find(x => x.role === "user").content === "") {
            // No user messages yet: do nothing.
            return;
        }

        myWorker.postMessage({ type: "generate", data: prompt });

    });
</script>

<div bind:this={myWorker} class="flex flex-col">

    <p id="loading" class="mx-auto"></p>

    <div class="w-[600px] max-w-[80%] max-h-[50px] mx-auto flex">
        <input
            bind:value={text}
            on:keydown={(event) => {
                if (event.key === "Enter" && !isRunning) {
                    event.preventDefault();
                    input = event.currentTarget.value;
                }
            }}
            class="w-[550px] px-3 py-3 rounded-full bg-transparent text-gray-500 border"
            placeholder="Brainstorm with me and press enter..."
        />

        <button 
            on:click={() => {
                myWorker.postMessage({ type: "load" });
            }}
            class="ml-3 border px-2 py-2 rounded-full bg-red-200 text-white hover:bg-red-300 w-50"
        >
        Load model
        </button>           
    </div>

    {#each results as result}
    <Box round={round}>
        <h1>{result}</h1>
    </Box>
    {/each}

</div>

