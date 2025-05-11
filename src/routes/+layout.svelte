<script>
	let { children } = $props();
	import "../app.css";
	import Chat from '$lib/Chat.svelte';
</script>

<div class="flex flex-col h-screen">
	<div class="me basis-5/6">
		{@render children()}
	</div>

	<div class="me basis-1/6">
		<div class="h-full mx-8 mx-auto invisible md:visible">
			<Chat />
		</div>
	</div>
</div>


<style>
	
</style>