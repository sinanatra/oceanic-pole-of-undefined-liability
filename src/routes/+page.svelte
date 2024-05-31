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
    <article>Loading...</article>
{:else}
    <article bind:clientWidth={width} bind:clientHeight={height}>
        <Map {data} />
    </article>
{/if}

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        background-color: rgb(193, 193, 193);
        text-rendering: optimizeLegibility;
    }

    article {
        height: 100vh;
        color: white;
        font-family: sans-serif;
    }
</style>
