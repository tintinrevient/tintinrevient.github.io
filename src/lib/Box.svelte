<script>
    let moving = false;
    let left = 900;
    let top = 200;

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

<div use:dragAction style="left: {left}px; top: {top}px; overflow-y: scroll;" class="bg-yellow-200 shadow-md">
    <slot />
</div>


<style>
    div {
        width: 150px;
        height: 150px;
        padding: 10px 10px 10px 10px;
        position: absolute;
    }
</style>