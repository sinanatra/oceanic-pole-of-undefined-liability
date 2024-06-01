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
        <span>Satellite: {currentPoint?.name}</span>
        <span>Year: {currentPoint?.year}</span>
    </div>
</div>

<style>
    .top-bar {
        background-color: black;
        color: white;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
    }

    .satellite-info span {
        margin-right: 20px;
    }

    .description p {
        margin: 0;
    }
</style>
