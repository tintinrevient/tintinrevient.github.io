<script>
  import '../app.css'
</script>

<div class="nav">
  <button>logo</button>
  <button>contact</button>
</div>

<style>
  .nav {
    display: flex;
		justify-content: space-between;
    align-items: center;
		width: 100%;
		padding: 1rem 0;
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