<script lang="ts">
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbase';
	import { user } from '$lib/store';

	let params = $page.url.pathname.split('/').splice(2, 3);

	async function getListing(id: string) {
		const listing = await pb.collection('listings').getOne(id);
		listing.seller = await pb.collection('users').getOne(listing.seller);
		return listing;
	}
</script>

<div class="block py-32">
	{#await getListing(params[1]) then listing}
		{listing.title}
	{/await}
</div>
