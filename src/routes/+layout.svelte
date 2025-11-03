<script lang="ts">
  import "../app.css";
  import pinpon from "$lib/assets/pinpon.png";

  let { children } = $props();

</script>

<svelte:head>
  <link rel="icon" href={pinpon} />
</svelte:head>

{@render children?.()}