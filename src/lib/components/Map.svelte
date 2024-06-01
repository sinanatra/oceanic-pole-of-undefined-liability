<script>
    import { onMount } from "svelte";
    import * as topojson from "topojson-client";
    import { geoPath, geoAzimuthalEquidistant, geoGraticule } from "d3-geo";

    let width = window.innerWidth;
    let height = window.innerHeight;

    const projection = geoAzimuthalEquidistant()
        .rotate([123, 48]) // center on Point Nemo
        .scale(250)
        .precision(1)
        .clipAngle(95.3)
        .translate([width / 2, height / 2]);

    const path = geoPath().projection(projection);
    // const graticule = geoGraticule().step([0, 10]);

    export let data;

    let PointNemo = [
        {
            lon: -126.3622344,
            lat: -72.9741938,
            name: "Maher Island",
        },
        {
            lon: -109.452777777778,
            lat: -27.2013888888889,
            name: "Easter Island",
        },
        {
            lon: -124.787888,
            lat: -24.6807263,
            name: "Ducie Island",
        },
        {
            lon: -123.3933333,
            lat: -48.8766667,
            name: "Point Nemo",
        },
    ];
    let world = [];
    let marineBorders = [];
    let contour = [];
    let spoua = [];
    let points = [];
    let currentPoints = [];
    let index = 0;
    let interval;

    onMount(async () => {
        try {
            const worldData = await fetch("world.json").then((d) => d.json());
            const marineBordersData = await fetch(
                "EEZ_land_v2_201410.json",
            ).then((d) => d.json());
            const contourData = await fetch("contour.json").then((d) =>
                d.json(),
            );
            const spouaData = await fetch("spoua.json").then((d) => d.json());

            world = topojson.feature(
                worldData,
                worldData.objects.land,
            ).features;
            marineBorders = topojson.feature(
                marineBordersData,
                marineBordersData.objects.EEZ_land_v2_201410,
            ).features;
            contour = topojson.feature(
                contourData,
                contourData.objects.collection,
            ).features;
            spoua = topojson.feature(
                spouaData,
                spouaData.objects.spoua,
            ).features;

            points = data
                .map((d) => {
                    const [cx, cy] = projection([d.lon, d.lat]);
                    return {
                        cx,
                        cy,
                        name: d.satellite_name,
                        year: d.satellite_decay,
                        r: d.rcs,
                    };
                })
                .filter((point) => !isNaN(point.cx) && !isNaN(point.cy));

            PointNemo = PointNemo.map((d) => {
                const [cx, cy] = projection([d.lon, d.lat]);
                return {
                    cx,
                    cy,
                    name: d.name,
                };
            });

            startAddingPoints();
        } catch (error) {
            console.error("Error loading or processing data:", error);
        }
    });

    const startAddingPoints = () => {
        interval = setInterval(() => {
            if (index < points.length) {
                currentPoints = [...currentPoints, points[index]];
                index += 1;
            } else {
                clearInterval(interval);
            }
        }, 500);
    };

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
        index = Math.floor((percentage / 100) * points.length);
        currentPoints = points.slice(0, index + 1);
    }
</script>

<div class="top-bar">
    <div class="description">
        <p>
            An interactive visualisation of all the space debris that reenteblue
            the atmosphere in the South Pacific Ocean. From 1960 until today.
        </p>
    </div>
    <div class="satellite-info">
        <span>Satellite: {currentPoints[currentPoints.length - 1]?.name}</span>
        <span>Year: {currentPoints[currentPoints.length - 1]?.year}</span>
    </div>
</div>

<!-- svelte-ignore a11y-no-static-element-interactions -->
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

<svg viewBox="0 0 {width} {height}" style="width: 100%; height: 100vh;">
    <defs>
        <path id="sphere" d={path({ type: "Sphere" })} />
        <clipPath class="clip" id="clip">
            <use href="#sphere" />
        </clipPath>
    </defs>
    {#if currentPoints.length > 1}
        <text text-anchor="left" dy="-5" fill="blue">
            <textPath href="#sphere" startOffset="60%">
                {currentPoints[currentPoints.length - 1]?.name}
                —
                {currentPoints[currentPoints.length - 1]?.year}
            </textPath>
        </text>
    {/if}

    <g clip-path="url(#clip)">
        <circle cx={width / 2} cy={height / 2} r={width} fill="#eeffff" />

        <!-- Marine Borders -->
        <g class="marine" fill="#e9f4ff" stroke="blue">
            {#each marineBorders as feature, i}
                <path d={path(feature)} class="marineBorders" />
            {/each}
        </g>

        <!-- World features -->
        <g class="world" fill="white" stroke="none">
            {#each world as feature, i}
                <path d={path(feature)} class="country" />
            {/each}
        </g>

        <!-- contour -->
        <g class="contour" fill="none" stroke="none">
            {#each contour as feature, i}
                <path d={path(feature)} class="contour" />
            {/each}
        </g>

        <!-- Lines connecting points -->
        <g>
            {#if currentPoints.length > 1}
                {#each currentPoints as point, i}
                    {#if i > 0 && currentPoints[i].name === currentPoints[i - 1].name}
                        <line
                            x1={currentPoints[i - 1].cx}
                            y1={currentPoints[i - 1].cy}
                            x2={point.cx}
                            y2={point.cy}
                            class={i === currentPoints.length - 1
                                ? "line highlite"
                                : "line old"}
                        />
                    {/if}
                {/each}
            {/if}
        </g>

        <!-- Points -->
        <g>
            {#each currentPoints as { cx, cy, name, r }, i}
                {#if i > 0 && currentPoints[i].name === currentPoints[i - 1].name}
                    <circle
                        {cx}
                        {cy}
                        {r}
                        fill="blue"
                        class={i === currentPoints.length - 1
                            ? "dot highlite"
                            : "dot old"}
                    />
                {:else if i === currentPoints.length - 1}
                    <circle {cx} {cy} {r} fill="blue" class="highlite" />
                {/if}
                <!-- Display satellite name close to the highlighted dot -->
                {#if i === currentPoints.length - 1}
                    <text
                        x={r + cx + 8}
                        y={cy + 2}
                        class="satellite-name"
                        font-size="8"
                    >
                        {name}
                    </text>
                {/if}
            {/each}
        </g>

        <!-- Graticule -->
        <!-- <g>
            <path class="graticule" fill="none" d={path(graticule())} />
        </g> -->

        <!-- Spoua -->
        <g class="spoua">
            {#each spoua as feature, i}
                <path d={path(feature)} class="spoua" />
            {/each}
        </g>

        <g class="nemo">
            {#each PointNemo as { cx, cy, name }}
                {#if cx && cy}
                    <circle {cx} {cy} r={1} fill="black" />
                    <text x={cx + 4} y={cy + 2} font-size="8">{name}</text>
                {/if}
            {/each}
        </g>
    </g>
</svg>

<style>
    .world {
        stroke-width: 0.2;
        fill: #fcfcfc !important;
    }

    .marine {
        stroke: black;
        stroke-width: 0.1;
        stroke-dasharray: 1px 2px;
    }

    .graticule,
    .contour {
        stroke-width: 0.1;
        stroke-dasharray: 1px 2px;
        stroke: black;
    }

    .spoua {
        stroke-width: 0.2;
        fill: #c5e6e6;
        opacity: 0.6;
        stroke-dasharray: 1px 1px;
        /* stroke: rgb(24, 24, 24); */
    }

    g {
        stroke-width: 0.2;
        stroke: black;
    }

    .dot {
        transition: r 1s;
    }

    .line {
        stroke-width: 0.1;
        fill: none;
    }

    .highlite {
        fill: blue;
        stroke: blue;
        stroke-width: 1;
        stroke-dasharray: 2px 4px;
    }

    .old {
        fill: rgb(193, 212, 212);
        stroke: rgb(193, 212, 212);
        stroke-width: 0.1;
    }

    .hide {
        display: none;
    }

    .nemo text,
    .nemo circle {
        fill: rgb(77, 77, 77);
        stroke: none;
    }

    .satellite-name {
        fill: blue;
        stroke: none;
    }

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
        /* transition: width 0.2s; */
    }

    .draggable {
        position: absolute;
        top: 0;
        width: 5px;
        height: 100%;
        background-color: blue;
    }

    .description p {
        margin: 0;
    }
</style>
