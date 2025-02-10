<script>
import P5 from 'p5-svelte'

let degX = $state();
let degY = $state();

let mouseX = $state();
let mouseY = $state();

let width = $state();
let height = $state();

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
        // CSS color name
        // For a list of available color names, see:
        // https://www.w3.org/wiki/CSS/Properties/color/keywords
        p5.background("azure");

        // Draw left eye
        let leftX = width - 300;
        let leftY = 100;

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
        let rightY = 100;

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
        width: 100%;
        height: 100%;
        overflow: hidden;
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