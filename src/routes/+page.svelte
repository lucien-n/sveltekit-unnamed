<script lang="ts">
	import Listing from '$lib/components/Listing.svelte';
	import { pb } from '$lib/pocketbase';
	import { sort } from '$lib/store';
	import { fade } from 'svelte/transition';

	let get_listings: any;

	async function getListings(sort_data: { direction: string; by: string; search: string }) {
		const query = await pb.collection('listings').getFullList(10, {
			sort: sort_data.direction + sort_data.by,
			filter: `title ~ "${sort_data.search}"`
		});

		return query;
	}

	const unsubscribe = sort.subscribe((sort_data) => {
		get_listings = getListings(sort_data);
	});
</script>

<main
	transition:fade={{ duration: 100 }}
	class="mx-auto h-full w-full overflow-y-scroll lg:w-11/12"
>
	<section id="listings" class="mx-1 h-full pt-24 md:mx-auto md:w-3/5">
		{#await get_listings then listings}
			{#each listings as listing}
				<br />
				<Listing {listing} />
			{/each}
		{/await}
	</section>
</main>
