<script lang="ts">
	import Listing from '$lib/components/Listing.svelte';
	import { pb } from '$lib/pocketbase';
	import { sort } from '$lib/store';
	import { get } from 'svelte/store';
	import { fade } from 'svelte/transition';

	async function getListings() {
		const query = await pb.collection('listings').getFullList(10, {
			sort: get(sort).direction + get(sort).by
		});

		return query;
	}
</script>

<main transition:fade={{ duration: 100 }} class="mx-auto h-full w-full lg:w-11/12">
	<section id="listings" class="mx-1 h-full pt-24 md:mx-auto md:w-3/5">
		{#await getListings() then listings}
			{#each listings as listing}
				<br />
				<Listing {listing} />
			{/each}
		{/await}
	</section>
</main>
