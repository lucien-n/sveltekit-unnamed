<script>
	import { fade } from 'svelte/transition';
	import { user } from '$lib/store';
</script>

{#await $user}
	wait
{:then user}
	{user}
{/await}
<main transition:fade={{ duration: 100 }} />
