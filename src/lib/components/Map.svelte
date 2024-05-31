<script>
    import { onMount } from "svelte";
    import * as topojson from "topojson-client";
    import { geoPath, geoAzimuthalEquidistant, geoGraticule } from "d3-geo";

    let width = 840;
    let height = 500;

    const projection = geoAzimuthalEquidistant()
        .rotate([123, 48]) // Centered on Point Nemo
        .scale(150)
        .precision(1)
        .clipAngle(95.3)
        .translate([width / 2, height / 2]);

    const path = geoPath().projection(projection);
    const graticule = geoGraticule().step([0, 10]);

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
    let navarea = [];
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
            const navareaData = await fetch("navarea.json").then((d) =>
                d.json(),
            );
            const spouaData = await fetch("spoua.json").then((d) => d.json());

            world = topojson.feature(
                worldData,
                worldData.objects.countries,
            ).features;
            marineBorders = topojson.feature(
                marineBordersData,
                marineBordersData.objects.EEZ_land_v2_201410,
            ).features;
            navarea = topojson.feature(
                navareaData,
                navareaData.objects.navarea,
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

    function handleSliderChange(event) {
        index = parseInt(event.target.value);
        currentPoints = points.slice(0, index + 1);
        if (interval) clearInterval(interval);
        startAddingPoints();
    }
</script>

{#if currentPoints.length > 0}
    <div>
        <input
            type="range"
            id="point-slider"
            min="0"
            max={points.length - 1}
            bind:value={index}
            on:input={handleSliderChange}
        />
        <span>{currentPoints[currentPoints.length - 1]?.name}</span>
        <span>{currentPoints[currentPoints.length - 1]?.year}</span>
    </div>
{/if}

<svg viewBox="0 0 {width} {height}" style="width: 100%; height: 100vh;">
    <defs>
        <path id="sphere" d={path({ type: "Sphere" })} />
        <clipPath class="clip" id="clip">
            <use href="#sphere" />
        </clipPath>
    </defs>

    <g clip-path="url(#clip)">
        <!-- Navarea -->
        <g fill="#d0d1d4" stroke="black">
            {#each navarea as feature, i}
                <path d={path(feature)} class="navarea" />
            {/each}
        </g>

        <!-- Marine Borders -->
        <g fill="#c2c2c2" stroke="black">
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

        <!-- Spoua -->
        <g fill="none" stroke="black">
            {#each spoua as feature, i}
                <path d={path(feature)} class="spoua" />
            {/each}
        </g>

        <g class="nemo">
            {#each PointNemo as { cx, cy, name }}
                <circle {cx} {cy} r={1} fill="black" />
                <text x={cx + 4} y={cy + 2} font-size="8">
                    {name}
                </text>
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
            {#each currentPoints as { cx, cy, name }, i}
                <circle
                    {cx}
                    {cy}
                    r={i === currentPoints.length - 1 ? 5 : 1}
                    fill="red"
                    class={i === currentPoints.length - 1
                        ? "dot highlite"
                        : "dot old"}
                />
                <!-- Display satellite name close to the highlighted dot -->
                {#if i === currentPoints.length - 1}
                    <text
                        x={cx + 8}
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
        <g>
            <path class="graticule" fill="none" d={path(graticule())} />
        </g>
    </g>
</svg>

<style>
    .world {
        fill: #fcfcfc !important;
    }

    .graticule {
        stroke: #ccc;
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
        fill: yellow;
        stroke: yellow;
        stroke-width: 1;
    }

    .old {
        fill: darkgray;
        stroke: darkgray;
        stroke-width: 0.1;
    }

    .nemo text,
    .nemo circle {
        fill: rgb(77, 77, 77);
        stroke: none;
    }

    .satellite-name {
        fill: yellow;
        stroke: none;
    }

    div {
        position: absolute;
        top: 10px;
    }
</style>
