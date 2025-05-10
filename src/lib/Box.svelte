<script>
    export let round; 
    let moving = false;

    let left = 700 + round * 20;
    let top = 200 + round * 20;

    function onMouseMove(e) {
        if (moving) {
            left += e.movementX;
            top += e.movementY;
        }
    }

    function onMouseUp(e) {
        moving = false;
    };

    function dragAction(node) {
        const onMouseDown = () => {
            moving = true;
        };

        node.addEventListener("mousedown", onMouseDown)

        return {
            destroy() {
                node.removeEventListener("mousedown", onMouseDown)
            },
            update() {
                node.style.left = left + "px";
                node.style.top = top + "px";
            },
        };
    }
</script>

<svelte:window on:mousemove={onMouseMove} on:mouseup={onMouseUp} />

<div use:dragAction style="left: {left}px; top: {top}px; overflow-y: scroll;" on:mouseover={mouseover} on:mouseleave={mouseleave} class="w-screen h-screen bg-yellow-200 shadow-md cursor-pointer hover:shadow-lg hover:shadow-gray-400">
    <slot />
</div>


<style>
    div {
        width: 163px;
        height: 163px;
        padding: 10px 10px 10px 10px;
        position: absolute;
    }
</style>