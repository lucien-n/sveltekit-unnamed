<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	export let listing: any;

	let hovered = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div id="listing-{listing.id}" class="mx-auto flex h-1/6 md:h-1/4">
	<div
		class="flex w-2/5 overflow-hidden rounded-lg rounded-r-none border border-r-0 border-zinc-700 shadow-lg hover:cursor-pointer sm:w-1/3"
	>
		<img
			src={listing.picture_url}
			alt="{listing.title}'s picture"
			class="h-full w-full self-center rounded-lg rounded-r-none hover:cursor-pointer"
			style="object-fit: cover;"
			on:click={() => goto(`/l/${listing.category}/${listing.id}`)}
		/>
	</div>
	<div
		in:fade={{ duration: 300 }}
		class="relative h-full w-3/5 rounded-lg rounded-l-none border border-l-0 border-zinc-700 bg-white px-5 py-4 shadow-lg hover:cursor-pointer dark:bg-zinc-900 sm:w-2/3"
		on:click={() => goto(`/l/${listing.category}/${listing.id}`)}
		on:mouseenter={() => (hovered = true)}
		on:mouseleave={() => (hovered = false)}
	>
		<div class="text-lg font-semibold hover:underline" class:text-orange-600={hovered}>
			{listing.title}
		</div>
		<div class="font-medium">
			<p>{listing.price}€</p>
		</div>

		<div class="absolute bottom-0 py-4 text-zinc-600 dark:text-zinc-400">
			{listing.category[0].toUpperCase() +
				listing.category.toLowerCase().slice(1, listing.category.length)}
		</div>
	</div>
</div>
