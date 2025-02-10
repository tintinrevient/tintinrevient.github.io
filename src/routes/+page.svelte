<script>
import P5 from 'p5-svelte';
import * as d3 from 'd3';
import { onMount } from 'svelte';

let degX = $state();
let degY = $state();

let mouseX = $state();
let mouseY = $state();

let width = $state();
let height = $state();

const topLeftX = 850;
const topLeftY = 200;
const size = 300;

const y = 10;
const strokeColor = "#F4ED36";

onMount(() => {
    const yScaleFar = d3.scaleLinear().domain([0, y]).range([topLeftY, topLeftY+size]);
    const yScaleNear = d3.scaleLinear().domain([0, y]).range([0, height]);

    const svg = d3.select("#box")
        .append("svg")
            .attr("viewBox", `0, 0, ${width}, ${height}`)
            .attr("style", "opacity:0.6");

    // Left lines
    for(let i = 0; i < y + 1; i++) {
        const x1 = 0;
        const y1 = yScaleNear(i);

        const x2 = topLeftX;
        const y2 = yScaleFar(i);

        svg.append("line")
            .attr("x1", x1)
            .attr("x2", x2)
            .attr("y1", y1)
            .attr("y2", y2)
            .attr("stroke", strokeColor)
            .attr("stroke-width", 2);
    };

    // Right lines
    // for(let i = 0; i < y + 1; i++) {
    //     const x1 = width;
    //     const y1 = yScaleNear(i);

    //     const x2 = topLeftX + size;
    //     const y2 = yScaleFar(i);

    //     svg.append("line")
    //         .attr("x1", x1)
    //         .attr("x2", x2)
    //         .attr("y1", y1)
    //         .attr("y2", y2)
    //         .attr("stroke", strokeColor)
    //         .attr("stroke-width", 2);
    // };

    // Center lines
    for(let i = 0; i < y + 1; i++) {
        const x1 = topLeftX;
        const y1 = yScaleFar(i);

        const x2 = width;
        const y2 = yScaleFar(i);

        svg.append("line")
            .attr("x1", x1)
            .attr("x2", x2)
            .attr("y1", y1)
            .attr("y2", y2)
            .attr("stroke", strokeColor)
            .attr("stroke-width", 2);
    };
});

const mousemove = (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;

    console.log(mouseX, mouseY);

    // degX =  -90 + (event.pageY * 90) / (height / 2);
    // degY = 90 - (event.pageX * 90) / (width / 2);            
}

const sketch = (p5) => {
    let x = 0;
    let y = 0;
    let size = 15;
    let threshold = 0;

    p5.setup = () => {
        let canvas = p5.createCanvas(width, height);
        canvas.position(0, 0);
        canvas.style("z-index", "-1");

        p5.colorMode(p5.HSB);

        // Set angle mode so that atan2() returns angles in degrees
        p5.angleMode(p5.DEGREES);

        // Create screen reader accessible description
        p5.textOutput();

        p5.describe("Two eyes that follow the cursor.");
    };

    p5.draw = () => {
        // Draw left eye
        let leftX = width - 300;
        let leftY = 50;

        // Calculate angle between left eye and mouse
        let leftAngle = p5.atan2(mouseY - leftY, mouseX - leftX);

        p5.push();
        p5.translate(leftX, leftY);
        p5.fill(255);
        p5.ellipse(0, 0, 50, 50);
        p5.rotate(leftAngle);
        p5.fill(0);
        p5.ellipse(12.5, 0, 25, 25);
        p5.pop();

        // Draw right eye
        let rightX = width - 100;
        let rightY = 50;

        // Calculate angle between right eye and angle
        let rightAngle = p5.atan2(mouseY - rightY, mouseX - rightX);

        p5.push();
        p5.translate(rightX, rightY);
        p5.fill(255);
        p5.ellipse(0, 0, 50, 50);
        p5.rotate(rightAngle);
        p5.fill(0);
        p5.ellipse(12.5, 0, 25, 25);
        p5.pop();
    };
}
</script>

<svelte:window on:mousemove={mousemove} />

<div id="box" style="position: absolute; width: {width}px; height: {height}px;"></div>

<div class="intro" bind:clientWidth={width} bind:clientHeight={height} style="transform: translateZ( -200px ) perspective( 600px ) rotateY( {degY}deg ) rotateX( {degX}deg );">
    <div class="item">I'm Shu</div>
    <div class="item">an AI engineer</div>
    <div class="item">I make things</div>
    <div class="item">with magic</div>
</div>

<P5 {sketch} />

<style>
    .intro {
        perspective: 800px;
        /* width: 100%; */
        /* height: 100%; */
        /* overflow: hidden; */
    }
    .item {
        font-size: 12vw;
        font-weight: bold;
        line-height: 12vw;
        color: left;
        text-align: left;
        transform-origin: left;
        transform: rotateY(40deg);
        transition-duration: .4s;
    }

    .item:hover {
        color: transparent;
        cursor: pointer;
        transform: rotateY(28deg) translateZ(0) scale(1.1);
        transition-duration: .4s;
        -webkit-text-stroke-width: 2px;
        -webkit-text-stroke-color: black;
    }
</style>