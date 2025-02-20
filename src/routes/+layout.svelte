<script>
	let { children } = $props();
	import "../app.css";
	import Chat from '$lib/Chat.svelte';
</script>

<div class="flex flex-col h-screen">
	<div class="basis-5/6">
		{@render children()}
	</div>

	<div class="basis-1/6">
		<div class="py-5 mx-8 mx-auto invisible md:visible">
			<Chat />
		</div>
	</div>
</div>

<style>

</style>