<script>
  import '../app.css';
</script>

<div class="nav">
  <div>logo</div>
  <div>contact</div>
</div>

<style>
	.nav {
		display: flex;
		justify-content: flex-start;
		gap: 50px;
		align-items: center;
		width: 100%;
		padding: 1rem 2rem;
	}

	button {
		padding: 0.5rem;
		color: white;
		background: black;
		border: 1px solid white;
		cursor: pointer;
		transition: all, 0.4s;
	}

	button:hover, button.is-active {
		color: black;
		background: white;
	}
</style>
  
<slot />