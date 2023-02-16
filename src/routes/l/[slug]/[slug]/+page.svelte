<script lang="ts">
	import { page } from '$app/stores';
	import { pb } from '$lib/pocketbase';

	let params = $page.url.pathname.split('/').splice(2, 3);

	async function getListing(id: string) {
		const listing = await pb.collection('listings').getOne(id);
		listing.seller = await pb.collection('users').getOne(listing.seller);
		console.log(listing.seller);
		return listing;
	}
</script>

<section class="block h-full w-full py-28">
	{#await getListing(params[1])}
		waiting for listing
	{:then listing}
		<div
			class="mx-auto w-full self-center rounded-lg border border-zinc-700 bg-white px-5 py-4 shadow-lg dark:bg-zinc-900 sm:w-2/3 lg:w-2/5"
		>
			<img
				src={listing.picture_url}
				alt="{listing.title}'s picture"
				class="w-full mx-auto self-center rounded-lg hover:cursor-pointer border border-zinc-700"
				style="object-fit: cover;"
			/>
			<br />
			<div class="flex w-full justify-between">
				<h1 class="text-2xl font-semibold">{listing.title}</h1>
				<h2
					class="inline-block text-lg font-medium text-zinc-700 dark:text-zinc-300 italic self-center"
				>
					{listing.price}€
				</h2>
			</div>
			<p class="italic text-md font-medium dark:text-zinc-300 text-zinc-600">
				{listing.seller.address}
			</p>
			<br />
			<p class="text-lg">{listing.description}</p>
		</div>
		<br />
		<div
			class="flex justify-between mx-auto w-full self-center rounded-lg border border-zinc-700 bg-white px-5 py-4 shadow-lg dark:bg-zinc-900 sm:w-2/3 lg:w-2/5"
		>
			<div class="flex">
				<p class="dark:text-zinc-300 text-zinc-500 italic self-center">Sold by</p>
				<a
					href="/u/{listing.seller.name}"
					class="ml-1 inline-block hover:underline font-semibold text-lg hover:cursor-pointer"
				>
					{listing.seller.name}
				</a>
			</div>
			<a
				href="mailto:{listing.seller.email}"
				class="inline-block italic text-lg font-medium hover:cursor-pointer hover:underline"
			>
				{listing.seller.email}
			</a>
		</div>
	{/await}
</section>
