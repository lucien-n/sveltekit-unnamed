<script lang="ts">
	import Listing from '$lib/components/Listing.svelte';
	import { fade } from 'svelte/transition';

	export let data: any;
</script>

<main transition:fade={{ duration: 100 }} class="mx-auto h-full w-full lg:w-11/12">
	<section id="listings" class="mx-1 h-full pt-24 md:mx-auto md:w-4/5">
		{#each data.listings.items.reverse() as listing}
			<br />
			<Listing {listing} />
		{/each}
	</section>
</main>
