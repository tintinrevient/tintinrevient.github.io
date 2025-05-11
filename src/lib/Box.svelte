<script>
    export let round; 
    export let width;
    export let height;
    
    let moving = false;

    let left = 700 + round * 20;
    let top = 200 + round * 20;

    let compRef;

    let editable = false;

    function handleDblClick(e) {
        editable = true;
    }

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

<div class="boxcontainer" use:dragAction style="left: {left}px; top: {top}px;" on:mouseover={mouseover} on:mouseleave={mouseleave} bind:this={compRef}>
    <div class="note w-screen h-screen bg-yellow-200 
                shadow-md cursor-pointer 
                hover:shadow-lg hover:shadow-gray-400"
                on:dblclick={handleDblClick} 
                contenteditable={editable}>
        <slot />
    </div>
    <button class="x bg-red-200 text-white hover:bg-red-300" on:click={() => compRef.parentNode.removeChild(compRef)}>
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