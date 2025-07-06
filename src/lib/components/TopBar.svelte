<script>
    export let currentPoint;
</script>

<div class="top-bar">
    <div class="description">
        <p>
            An interactive visualization of all the space debris that reenters
            the atmosphere in the South Pacific Ocean. From 1960 until today.
        </p>
    </div>
    <div class="satellite-info">
        <p>Satellite: {currentPoint?.name}</p>
        <p>Year: {currentPoint?.year}</p>
    </div>
</div>

<style>
    .top-bar {
        width: 100%;
        background-color: black;
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-size: 14px;
    }

    .satellite-info {
        font-size: 10px;
        margin-right: 10px;
        /* max-width: 250px;
        overflow: hidden; */
        text-align: right;
        display: block;
    }

    .satellite-info p {
        display: block;
        margin: 0;
        padding: 0;
    }

    .description p {
        margin: 5px;
        /* font-style: italic; */
    }
</style>
