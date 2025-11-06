<script>
    let { round, width, height, children } = $props();
    
    let left_min = 50;
    let left_max =$derived(width - 200);

    let top_min = 50;
    let top_max = $derived(height - 200);

    let left = $derived(Math.random() * (left_max - left_min) + left_min);
    let top = $derived(Math.random() * (top_max - top_min) + top_min);

    let compRef = $state();

    let moving = $state(false);
    let editable = $state(false);

    function handleDblClick(e) {
        editable = true;
    };

    function handleMouseMove(e) {
        if (moving) {
            left += e.movementX;
            top += e.movementY;
        }
    };

    function handleMouseUp(e) {
        moving = false;
    };

    function dragAction(node) {
        const onMouseDown = (e) => {
            moving = true;
        };

        node.addEventListener("mousedown", onMouseDown);

        return {
            destroy() {
                node.removeEventListener("mousedown", onMouseDown);
            }
        };
    };
</script>

<svelte:window on:mousemove={handleMouseMove} on:mouseup={handleMouseUp} />

<div class="boxcontainer" use:dragAction style="left: {left}px; top: {top}px;" bind:this={compRef}>
    <div class="note rounded-2xl w-screen h-screen bg-yellow-200
                shadow-md cursor-pointer
                hover:shadow-lg hover:shadow-gray-400"
                role="textbox"
                tabindex="0"
                ondblclick={handleDblClick}
                contenteditable={editable}>
        {@render children?.()}
    </div>
    <button class="x rounded-full bg-red-200 text-white hover:bg-red-300" onclick={() => compRef.parentNode.removeChild(compRef)}>
        X
    </button>
</div>

<style>
    .boxcontainer {
        width: 163px;
        height: 163px;
        padding: 10px 10px 10px 10px;
        position: absolute;
        overflow-y: visible;
    }
    .note {
        width: 163px;
        height: 163px;
        padding: 10px 10px 10px 10px;
        position: absolute;
        overflow-y: scroll;
    }

    .x {
        position: absolute;
        color: white;
        top: 0px;
        right: -20px;
        width: 25px;
        height: 25px;
    }
</style>