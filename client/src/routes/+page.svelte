<script lang="ts">
    import { onMount } from 'svelte';

    const api = import.meta.env.API_URI || 'http://localhost:8000';

    let boardDisplay: string = '';
    const horizontalLineDisplay: string = '---------------\n';
    const columnDisplay: string = ' 1 2 3 4 5 6 7 ';

    $: screen = boardDisplay + horizontalLineDisplay + columnDisplay;

    let selectedColumn: number = 1;
    let doorMessage: string = 'The door is closed.';
    let errorMessage: string = '';

    const handleNewGame = async () => {
        try {
            const response = await fetch(`${api}/game`, { method: 'POST' });

            if (!response.ok) {
                const error = await response.json();
                console.error('Error starting a new game:', error);
                errorMessage = error.message;
            } else {
                errorMessage = '';
            }

            boardDisplay = await response.text();
        } catch (error: unknown) {
            console.error('Error starting a new game:', error);
        }
    };

    const handleFetchBoard = async () => {
        try {
            const response = await fetch(`${api}/board`, { method: 'GET' });

            if (!response.ok) {
                const error = await response.json();
                console.error('Error fetching the board:', error);
                errorMessage = error.message;
            } else {
                errorMessage = '';
            }

            boardDisplay = await response.text();
        } catch (error: unknown) {
            console.error('Error fetching the board:', error);
        }
    };

    const handleUserMove = async (col: number) => {
        try {
            const response = await fetch(`${api}/token/user/${col}`, { method: 'PUT' });

            if (!response.ok) {
                const error = await response.json();
                console.error('Error user move:', error);
                errorMessage = error.message;
            } else {
                errorMessage = '';
            }

            boardDisplay = await response.text();
        } catch (error: unknown) {
            console.error('Error user move:', error);
        }
    };

    const handleHouseMove = async () => {
        try {
            const response = await fetch(`${api}/token/house`, { method: 'PUT' });

            if (!response.ok) {
                const error = await response.json();
                console.error('Error house move:', error);
                errorMessage = error.message;
            } else {
                errorMessage = '';
            }

            boardDisplay = await response.text();
        } catch (error: unknown) {
            console.error('Error house move:', error);
        }
    };

    const handleOpenDoor = async () => {
        try {
            const response = await fetch(`${api}/door/open`, { method: 'POST' });
            doorMessage = await response.text();
        } catch (error: unknown) {
            console.error('Error opening the door:', error);
        }
    };

    const handleStartNewGame = async () => {
        await handleNewGame();

        // 50% chance that the house will make the first move
        const houseStart = Math.floor(Math.random() * 2);
        if (houseStart) await handleHouseMove();
    };

    const handlePlay = async (column: number) => {
        await handleUserMove(column);

        // set an artificial delay so as not to disturb the user
        setTimeout(async () => {
            await handleHouseMove();
        }, 500);
    };

    onMount(handleFetchBoard);
</script>

<h1>Welcome to your door security interface</h1>
<p>You must win Connect4 to open the door... good luck!</p>
<pre>{screen}</pre>

<label for="column">Choose a column:</label>
<br />
<select id="column" bind:value={selectedColumn}>
    {#each [1, 2, 3, 4, 5, 6, 7, 8, 9] as column}
        <option value={column}>{column}</option>
    {/each}
</select>
<button on:click={() => handlePlay(selectedColumn)}>Play</button>
{#if errorMessage}<small class="error">{errorMessage}</small>{/if}

<br />
<br />

<button on:click={handleOpenDoor}>Open the door</button>
<button on:click={handleStartNewGame}>New game</button>
<p>{doorMessage}</p>

<style>
    .error {
        color: red;
    }
</style>
