<script>
    import { onMount } from "svelte";
    import Map from "@components/Map.svelte";

    let data = [];
    let width, height;

    onMount(async () => {
        const response = await fetch("data.json");
        data = await response.json();
    });
</script>

{#if data.length === 0}
    <p>Loading...</p>
{:else}
    <article bind:clientWidth={width} bind:clientHeight={height}>
        <Map {data} />
    </article>
{/if}

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        background-color: rgb(176, 176, 176);
        text-rendering: optimizeLegibility;
        font-family: sans-serif;
    }

    p {
        color: black;
        padding: 0;
        margin: 0;
    }

    article {
        height: 100vh;
        color: white;
    }
</style>
