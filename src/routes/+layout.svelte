<script>
	import Nav from '$lib/components/Nav.svelte';
</script>

<div
	class="h-screen w-screen text-black transition duration-500 ease-in-out dark:bg-neutral-800 dark:text-gray-300"
>
	<Nav />
	<slot />
</div>
