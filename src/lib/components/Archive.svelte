<script>
    import Colophon from "@components/Colophon.svelte";
    export let points;
    export let highlighted;
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let searchTerm = "";

    $: filteredPoints = uniquePoints.filter((d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    $: uniquePoints = points.reduce((acc, current) => {
        const x = acc.find(
            (item) => item.name === current.name && item.year === current.year,
        );
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);

    function handleClick(index) {
        dispatch("updateId", filteredPoints[index]);
    }
</script>

<article>
    <input type="text" placeholder="Search..." bind:value={searchTerm} />

    <div>
        {#each filteredPoints as d, index}
            <p
                class:gray-background={index % 2 === 1}
                class:highlight={highlighted &&
                    highlighted.name === d.name &&
                    highlighted.year == d.year}
                on:click={() => handleClick(index)}
            >
                {d.name}, {d.year}
            </p>
        {/each}
    </div>
</article>
<Colophon />

<style>
    article {
        font-size: 10px;
        width: 30vw;
        min-width: 250px;
        overflow: scroll;
        color: black;
        background-color: white;
    }

    .gray-background {
        background-color: lightgray;
    }

    .highlight {
        background: blue;
        color: white;
    }

    p {
        margin: 0;
        padding: 5px;
        cursor: pointer;
    }

    input {
        width: 100%;
        border: none;
        outline: none;
        color: blue;
        position: sticky;
        top: 0;
    }

    div {
        margin-top: 10px;
    }
</style>
