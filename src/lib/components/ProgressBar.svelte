<script>
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let index;
    export let points;

    function handleDrag(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        let x = event.clientX - rect.left;
        const width = rect.width;
        if (x < 0) {
            x = 0;
        } else if (x > width) {
            x = width;
        }
        const percentage = (x / width) * 100;
        const newIndex = Math.floor((percentage / 100) * points.length);
        dispatch("updateIndex", newIndex);
    }
</script>

<div class="progress-bar" on:mousedown={handleDrag}>
    <div
        class="progress"
        style="width: {((index + 1) / points.length) * 100}%;"
    ></div>
    <div
        class="draggable"
        style="left: {((index + 1) / points.length) * 100}%;"
    ></div>
</div>

<style>
    .progress-bar {
        position: relative;
        width: 100%;
        height: 10px;
        background-color: black;
        overflow: hidden;
        cursor: pointer;
    }

    .progress {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background-color: gray;
    }

    .draggable {
        position: absolute;
        top: 0;
        width: 5px;
        height: 100%;
        background-color: blue;
    }
</style>
