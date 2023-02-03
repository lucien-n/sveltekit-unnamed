<script lang="ts">
	import { goto } from '$app/navigation';
	import Separator from '$lib/components/Separator.svelte';
	import { pb } from '$lib/pocketbase';
	import { user } from '$lib/store';

	let title: string;
	let description: string;
	let price: Float32Array;
	let picture_asUrl: any;
	let picture_asFile: any;

	let image_input: any;

	const onFileSelected = (e: any) => {
		let image = e.target?.files[0];
		const reader = new FileReader();
		picture_asFile = image;
		reader.readAsDataURL(image);
		reader.onload = (e) => {
			picture_asUrl = e.target?.result;
		};
	};

	async function createListing() {
		if (!$user) return;

		const data = {
			title: title,
			description: description,
			seller: $user.id,
			price: price,
			category: 'default',
			picture_url: picture_asUrl
		};
		pb.collection('listings').create(data);

		goto('/');
	}
</script>

<div id="new" class="pointer-events-none flex h-full w-full">
	<div
		class="lgù:inline-block pointer-events-auto mx-auto mr-2 w-fit self-center rounded-lg border border-zinc-700 bg-white px-5 py-4 shadow-lg dark:bg-zinc-900 sm:w-3/5 md:w-2/5"
	>
		<div class="px-2 py-3">
			<div id="title">
				<span class="text-lg"> Title </span>
				<input
					type="text"
					name="title"
					id="title_input"
					placeholder=""
					class="block w-full rounded-md border border-zinc-700 px-2 py-1 text-lg outline-none outline-offset-0 focus:outline-blue-500 dark:bg-zinc-800 sm:rounded-lg sm:px-3"
					bind:value={title}
				/>
			</div>
			<br />
			<div id="description">
				<span class="text-lg">Description</span>
				<textarea
					name="description"
					id="description_input"
					cols="30"
					rows="5"
					class="block w-full rounded-md border border-zinc-700 px-2 py-1 text-base outline-none outline-offset-0 focus:outline-blue-500 dark:bg-zinc-800 sm:rounded-lg sm:px-3"
					bind:value={description}
				/>
			</div>
			<br />
			<div>
				<div id="price">
					<span class="text-lg">Price</span>
					<span class="block text-zinc-500"> in euros (€) </span>
					<input
						type="text"
						name="price"
						id="price_input"
						class="block w-1/3 rounded-md border border-zinc-700 px-2 py-1 text-lg outline-none outline-offset-0 focus:outline-blue-500 dark:bg-zinc-800 sm:rounded-lg sm:px-3"
						bind:value={price}
					/>
				</div>
				<br />
				<div id="submit">
					<button
						name="submit"
						id="submit_input"
						on:click={createListing}
						class=" m-auto block w-1/4 rounded-md border border-zinc-700 px-2 py-2 text-lg outline-none outline-offset-0 focus:outline-blue-500 dark:bg-zinc-800 sm:rounded-lg sm:px-3"
						>Submit</button
					>
				</div>
			</div>
		</div>
	</div>

	<!-- * Image -->
	<div
		class="pointer-events-auto mx-auto ml-2 inline-block w-fit self-center rounded-lg border border-zinc-700 bg-white px-5 py-4 shadow-lg dark:bg-zinc-900 sm:w-2/5 md:w-2/5 lg:w-1/5"
	>
		<!-- * Upload -->
		<div class="flex h-full w-full flex-col justify-center">
			{#if picture_asUrl}
				<div id="preview-picture" class="m-0 w-full px-0 py-3">
					<!-- svelte-ignore a11y-img-redundant-alt -->
					<img
						src={picture_asUrl}
						alt="Uploaded picture"
						class="w-full rounded-lg border border-zinc-700 shadow"
					/>
				</div>
				<Separator />
			{/if}
			<div id="upload-picture" class="flex w-full justify-center px-3 py-2">
				<label class="flex cursor-pointer">
					<input
						type="file"
						name="image"
						id="image"
						alt="listing picture"
						class="hidden"
						accept=".png, .jpg, .jpeg"
						on:change={(e) => onFileSelected(e)}
						bind:this={image_input}
					/>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
						/>
					</svg>
					<span class="px-2">Upload an image</span>
				</label>
			</div>
		</div>
	</div>
</div>
