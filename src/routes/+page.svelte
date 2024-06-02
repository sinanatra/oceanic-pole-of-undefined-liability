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
            rcs: 1 + ((d.rcs - minRcs) * 9) / (maxRcs - minRcs),
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
        background-color: rgb(243, 243, 243);
        text-rendering: optimizeLegibility;
        font-family: "mono", sans-serif;
    }

    p {
        color: black;
        padding: 0;
        margin: 0;
    }

    article {
        color: white;
        overflow: hidden;
    }

    @font-face {
        font-family: "mono";
        src: url("./fonts/SpaceMono-Regular.ttf") format("truetype");
        font-style: normal;
    }
    @font-face {
        font-family: "mono";
        src: url("./fonts/SpaceMono-Italic.ttf") format("truetype");
        font-style: italic;
    }
</style>
