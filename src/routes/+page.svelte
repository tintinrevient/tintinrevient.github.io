<script>
import P5 from 'p5-svelte';
import { onMount } from 'svelte';
import technologies from '$lib/data/technologies.json';
import { select } from 'd3-selection';
import { drawMouth } from '$lib/mouth';
import { drawTree } from '$lib/tree';
import { jsonToHierarchy } from '$lib/hierarchy';
import Chat from '$lib/Chat.svelte';

let mouseX = $state();
let mouseY = $state();

let width = $state();
let height = $state();

onMount(() => {

    // draw mouth
    drawMouth(width, height);

    // draw tree
    const [root, descendants, leaves] = jsonToHierarchy(technologies);

    drawTree(root, descendants, leaves, width, height);

});

const sketch = (p5) => {
    
    let canvas;

    p5.setup = () => {
        canvas = p5.createCanvas(width, height);
        canvas.position(0, 0);
        canvas.style("z-index", "-1");

        p5.colorMode(p5.HSB);

        // set angle mode so that atan2() returns angles in degrees
        p5.angleMode(p5.DEGREES);

        // create screen reader accessible description
        p5.textOutput();

        p5.describe("Two eyes that follow the cursor.");
    };

    p5.draw = () => {
        p5.background("white");

        // draw left eye
        let leftX = width / 2 - 150;
        let leftY = height / 2 - 250;

        // calculate angle between left eye and mouse
        let leftAngle = p5.atan2(mouseY - leftY, mouseX - leftX);

        p5.push();
        p5.translate(leftX, leftY);
        p5.fill(255);
        p5.ellipse(0, 0, 50, 50);
        p5.rotate(leftAngle);
        p5.fill(0);
        p5.ellipse(12.5, 0, 25, 25);
        p5.pop();

        // draw right eye
        let rightX = width / 2 + 150;
        let rightY = height / 2 - 250;

        // calculate angle between right eye and angle
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

const mousemove = (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;       
}

const mouseover = () => {
    select("#tree").style("opacity", 1);
}

const mouseleave = () => {
    select("#tree").style("opacity", 0);
}
</script>

<svelte:window on:mousemove={mousemove} />

<div class="relative w-full h-full">
    <div id="mouth" class="absolute w-full h-full"></div>

    <div id="eyes" class="absolute w-full h-full">
        <P5 {sketch} />
    </div>

    <div id="tree" class="absolute w-full h-full opacity-0 transition-opacity duration-400 ease-in-out"></div>

    <div class="absolute w-full h-full flex flex-col justify-evenly perspective-near" bind:clientWidth={width} bind:clientHeight={height}>
        <div class="item">I'm Shu</div>
        <div class="item" on:mouseover={mouseover} on:mouseleave={mouseleave}>an AI engineer</div>
        <div class="item">I make things</div>
        <div class="item">with magic</div>
    </div>
</div>

<Chat />

<style>
    .item {
        font-family: "Gill Sans";
        font-size: 12vw;
        font-weight: bold;
        line-height: 12vw;
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