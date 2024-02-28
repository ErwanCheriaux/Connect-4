<script lang="ts">
    import { onMount } from 'svelte';

    const api = import.meta.env.API_URI || 'http://localhost:8000';

    let screen: string = '';

    const handleNewGame = async () => {
        try {
            const response = await fetch(`${api}/game`, { method: 'POST' });

            if (!response.ok) {
                const error = await response.json();
                console.error('Error starting a new game:', error);
            }

            screen = await response.text();
        } catch (error: unknown) {
            console.error('Error starting a new game:', error);
        }
    };

    onMount(handleNewGame);
</script>

<h1>Welcome to your door security interface</h1>
<p>You must win Connect4 to open the door... good luck!</p>
<pre>{screen}</pre>

<button on:click={handleNewGame}>New game</button>
