<script>
    import { onMount } from "svelte";
    import * as topojson from "topojson-client";
    import { geoPath, geoAzimuthalEquidistant } from "d3-geo";
    import TopBar from "@components/TopBar.svelte";
    import ProgressBar from "@components/ProgressBar.svelte";
    import Archive from "@components/Archive.svelte";

    export let data;
    let container;
    let width = 0;
    let height = 0;
    let projection;

    let PointNemo = [
        { lon: -126.3622344, lat: -72.9741938, name: "Maher Island" },
        {
            lon: -109.452777777778,
            lat: -27.2013888888889,
            name: "Easter Island",
        },
        { lon: -124.787888, lat: -24.6807263, name: "Ducie Island" },
        { lon: -123.3933333, lat: -48.8766667, name: "Point Nemo" },
    ];
    let world = [];
    let marineBorders = [];
    let contour = [];
    let spoua = [];
    let points = [];
    let currentPoints = [];
    let currentPoint = null;
    let index = 0;
    let interval;
    let path;

    onMount(async () => {
        updateDimensions();

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
                return { cx, cy, name: d.name };
            });

            startAddingPoints();
        } catch (error) {
            console.error("Error loading or processing data:", error);
        }

        window.addEventListener("resize", updateDimensions);
    });

    function updateDimensions() {
        if (container) {
            width = container.clientWidth;
            height = container.clientHeight;
            projection = geoAzimuthalEquidistant()
                .rotate([123, 48])
                .scale(260)
                .precision(1)
                .clipAngle(100)
                .translate([width / 2, height / 2]);

            path = geoPath().projection(projection);
        }
    }

    const startAddingPoints = () => {
        if (interval) clearInterval(interval);
        index = 0;
        currentPoints = [];
        interval = setInterval(() => {
            if (index < points.length) {
                currentPoints = [...currentPoints, points[index]];
                currentPoint = points[index];
                index = (index + 1) % points.length;
            } else {
                clearInterval(interval);
            }
        }, 500);
    };

    const handleUpdateIndex = (newIndex) => {
        index = newIndex.detail;
        currentPoints = points.slice(0, index + 1);
        currentPoint = currentPoints[currentPoints.length - 1];
        highlighted = points[index + 1];
    };

    $: highlighted = currentPoints.slice(-1)[0];

    const handleUpdateId = (datum) => {
        index = points.findIndex(
            (d) => d.name == datum.detail.name && d.year == datum.detail.year,
        );

        currentPoints = points.slice(0, index + 1);
    };
</script>

<TopBar {currentPoint} />
<ProgressBar {index} {points} on:updateIndex={handleUpdateIndex} />
<article>
    <div bind:this={container}>
        {#if currentPoints.length > 0}
            <svg viewBox="0 0 {width} {height}">
                <defs>
                    <path id="sphere" d={path({ type: "Sphere" })} />
                    <clipPath class="clip" id="clip">
                        <use href="#sphere" />
                    </clipPath>
                </defs>
                {#if currentPoints.length > 0}
                    <text text-anchor="left" dy="-5" font-size="36" fill="blue">
                        <textPath href="#sphere" startOffset="15%">
                            {currentPoints[currentPoints.length - 1]?.name} — {currentPoints[
                                currentPoints.length - 1
                            ]?.year}
                        </textPath>
                    </text>
                {/if}

                <g clip-path="url(#clip)">
                    <circle
                        cx={width / 2}
                        cy={height / 2}
                        r={width * 2}
                        class="bg"
                    />

                    <!-- Marine Borders -->
                    <g class="marine" fill="#e9f4ff" stroke="blue">
                        {#each marineBorders as feature, i}
                            <path d={path(feature)} class="marineBorders" />
                        {/each}
                    </g>

                    <!-- World features -->
                    <g class="world" stroke="none">
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
                        {#if currentPoints.length > 0}
                            {#each currentPoints as point, i}
                                {#if i > 0 && currentPoints[i].name === currentPoints[i - 1].name}
                                    <line
                                        x1={currentPoints[i - 1].cx}
                                        y1={currentPoints[i - 1].cy}
                                        x2={point.cx}
                                        y2={point.cy}
                                        class:highlite={i ===
                                            currentPoints.length - 1}
                                        class:old={i !==
                                            currentPoints.length - 1}
                                        class:debris={name.includes("DEB")}
                                    />
                                {/if}
                            {/each}
                        {/if}
                    </g>

                    <!-- Points -->
                    <g>
                        {#each currentPoints as { cx, cy, name, r }, i}
                            {#if i === currentPoints.length - 1}
                                <circle
                                    {cx}
                                    {cy}
                                    {r}
                                    fill="blue"
                                    class="highlite"
                                    class:debris={name.includes("DEB")}
                                />

                                <!-- {:else if i > 0 && currentPoints[i].name === currentPoints[i - 1].name}
                                <circle
                                    {cx}
                                    {cy}
                                    {r}
                                    fill="blue"
                                    class:highlite={i ===
                                        currentPoints.length - 1}
                                    class:old={i !== currentPoints.length - 1}
                                    class:debris={name.includes("DEB")}
                                /> -->
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
                                <text x={cx + 4} y={cy + 2} font-size="8"
                                    >{name}</text
                                >
                            {/if}
                        {/each}
                    </g>
                </g>
            </svg>
        {/if}
    </div>
    <Archive {points} {highlighted} on:updateId={handleUpdateId} />
</article>

<style>
    article {
        display: flex;
        width: 100%;
        height: 100vh;
    }

    article div {
        width: 100%;
        height: 100%;
    }

    .bg {
        fill: #e2e9ff;
    }

    .world {
        stroke-width: 0.2;
        fill: rgb(254, 255, 245);
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
        fill: #c1c8d4;
        stroke: #c1c8d4;
        stroke-width: 0.2;
    }

    .debris {
        stroke: none;
        fill: #c1c8d421;
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
</style>
