<script>
    import { onMount } from "svelte";
    import Map from "@components/Map.svelte";

    let data = [];
    let width, height;

    onMount(async () => {
        const response = await fetch("data.json");
        const rawData = await response.json();

        // min max rcs
        const minRcs = Math.min(...rawData.map((d) => d.rcs));
        const maxRcs = Math.max(...rawData.map((d) => d.rcs));

        data = rawData.map((d) => ({
            ...d,
            rcs: 1 + ((d.rcs - minRcs) * 19) / (maxRcs - minRcs),
        }));
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
        background-color: rgb(227, 227, 227);
        text-rendering: optimizeLegibility;
        font-family: sans-serif;
    }

    p {
        color: black;
        padding: 0;
        margin: 0;
    }

    article {
        color: white;
        overflow: hidden;
        height: 99vh;
    }
</style>
