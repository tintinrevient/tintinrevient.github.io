<script>
import P5 from 'p5-svelte';
import * as d3 from 'd3';
import { onMount } from 'svelte';

let mouseX = $state();
let mouseY = $state();

let width = $state();
let height = $state();

const stroke = "#F4ED36";
const boxWidth = 3;

onMount(() => {
    console.log("mounted");
    const svg = d3.select("#cube")
         .append("svg")
            .attr("viewBox", `0, 0, ${width}, ${height}`)
            .style("opacity", "0.5");

    const box = svg.append("g")
        .attr("class", "box")
        .style("opacity", "0.0");
    
    box.append("rect")
        .attr("x", width / 2 + 300)
        .attr("y", height / 2 - 300)
        .attr("width", 200)
        .attr("height", 200)
        .attr("fill", stroke)
        .attr("stroke", stroke)
        .attr("stroke-width", boxWidth);
    
    box.append("line")
        .attr("x1", width / 2)
        .attr("x2", width / 2 + 300)
        .attr("y1", height / 2)
        .attr("y2", height / 2 - 300)
        .attr("stroke", stroke)
        .attr("stroke-width", boxWidth);
    
    box.append("line")
        .attr("x1", width / 2)
        .attr("x2", width / 2 + 300)
        .attr("y1", height / 2)
        .attr("y2", height / 2 - 300 + 200)
        .attr("stroke", stroke)
        .attr("stroke-width", boxWidth);

    box.append("line")
        .attr("x1", width / 2)
        .attr("x2", width / 2 + 300 + 200)
        .attr("y1", height / 2)
        .attr("y2", height / 2 - 300 + 200)
        .attr("stroke", stroke)
        .attr("stroke-width", boxWidth);

    svg.append("g")
        .attr("class", "circle")
        .append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .attr("r", 150)
        .attr("stroke", "red")
        .attr("stroke-width", 30)
        .attr("fill", "black");
});

const mousemove = (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;       
}

const mouseover = () => {
    d3.select(".box")
        .transition()
        .delay(250)
        .duration(850)
        .ease(d3.easeCubicInOut)
        .style("opacity", "1.0");
}

const mouseleave = () => {
    d3.select(".box")
        .transition()
        .duration(250)
        .ease(d3.easeCubicInOut)
        .style("opacity", "0.0");
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
        let leftX = width / 2 - 150;
        let leftY = height / 2 - 250;

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
        let rightX = width / 2 + 150;
        let rightY = height / 2 - 250;

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

<div>
    <div id="cube" class="absolute w-full h-full"></div>

    <div id="eyes" class="absolute w-full h-full">
        <P5 {sketch} />
    </div>

    <div class="flex flex-col perspective-near" bind:clientWidth={width} bind:clientHeight={height}>
        <div class="item">I'm Shu</div>
        <div class="item" on:mouseover={mouseover} on:mouseleave={mouseleave}>an AI engineer</div>
        <div class="item">I make things</div>
        <div class="item">with magic</div>
    </div>
</div>

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