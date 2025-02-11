<script>
	let { children } = $props();
	import "../app.css";
</script>

<div class="flex flex-col h-screen">
	<div class="basis-5/6">
		{@render children()}
	</div>

	<div class="basis-1/6">
		<div class="py-5 mx-8 text-3xl font-bold underline flex flex-col justify-between md:flex-row items-center">
				<div class="px-5">logo</div>
				<div>
					<ul class="flex space-x-2">
						<li class="px-5 hover:bg-yellow-100 hover:rounded-full cursor-pointer">contact</li>
					</ul>
				</div>
		</div>
	</div>
</div>

<style>

</style>