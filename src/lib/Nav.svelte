<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { clickOutside } from '$lib/clickOutside';
	import { signOut } from '$lib/pocketbase';
	import { user } from './store';

	let darkTheme = false;
	onMount(() => {
		darkTheme = localStorage.getItem('theme') === 'dark' ? true : false;
	});

	function switchTheme() {
		darkTheme = !darkTheme;
		localStorage.theme = darkTheme ? 'dark' : 'light';
		if (darkTheme) document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');
	}

	let search = '';

	let showSearchOptions = false;
	let toggleShowSearchOptions = () => {
		showSearchOptions = !showSearchOptions;
	};

	let showUserProfile = false;
	let toggleShowUserProfile = () => {
		showUserProfile = !showUserProfile;
	};

	function executeSearch() {
		console.log(search);
		return;
	}

	// let priceMin = 0;
	// let priceMax = 100;
</script>

<nav class="fixed z-50 w-full p-1 transition duration-500 ease-in-out sm:p-3">
	<div
		class="mx-auto w-full rounded border border-zinc-700 bg-zinc-100 py-2 shadow-lg dark:bg-zinc-900 sm:p-2 lg:w-3/5"
	>
		<div class="flex justify-between">
			<!-- Home -->

			<!-- * Desktop -->
			<div class="flex cursor-pointer self-center">
				<a href="/" class="px-2 py-3">
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
							d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
						/>
					</svg>
				</a>
			</div>

			<!-- * Search -->
			<div class="flex w-full cursor-text items-center md:w-3/4">
				<!-- Settings -->
				<button
					on:click={toggleShowSearchOptions}
					class="inline-block h-5/6 rounded-l-md border border-r-0 border-zinc-700 bg-white p-1 pl-2 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 sm:h-full sm:p-2 sm:pl-3"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="inline-block h-6 w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
						/>
					</svg>
				</button>

				<!-- Input -->
				<input
					type="text"
					bind:value={search}
					class="z-10 inline-block h-5/6 w-full border border-l-0 border-r-0 border-zinc-700 p-1 outline-none outline-offset-0 focus:outline-blue-500 dark:bg-zinc-800 dark:focus:outline-1 sm:h-full sm:p-2"
				/>

				<!-- Execute -->
				<button
					class="inline-block h-5/6 rounded-r-md border border-l-0 border-zinc-700 bg-white p-1 pr-2 dark:bg-zinc-800 sm:h-full sm:p-2 sm:pr-3"
					on:click={executeSearch}
				>
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
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				</button>
			</div>

			<!-- * Add Listing -->
			<div id="listing" class="flex cursor-pointer">
				<a href="/new" class="px-2 py-3">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
				</a>
			</div>

			<!-- * Profile -->
			<div id="profile" class="dropdown relative flex cursor-pointer">
				<button
					on:click={toggleShowUserProfile}
					class:pointer-events-none={showUserProfile}
					class="px-2 py-3"
				>
					<div
						class="absolute right-1 h-2 w-2 rounded-lg border-2 border-zinc-800"
						class:bg-green-500={$user.user?.isValid}
						class:bg-red-500={!$user.user?.isValid}
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
							d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
						/>
					</svg>
				</button>

				{#if showUserProfile}
					<ul
						use:clickOutside
						on:clickoutside={() => (showUserProfile = false)}
						transition:fade={{ duration: 100 }}
						id="profile-menu"
						class="dropdown-menu dropdown-menu absolute right-0 z-50 mt-12 min-w-max rounded-lg border border-zinc-700 bg-zinc-100 dark:bg-zinc-900 sm:mt-16"
					>
						<!-- Switch theme -->
						<div
							class="flex w-full rounded-lg rounded-b-none px-3 py-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
						>
							<button on:click={switchTheme} class="dropdown-item mx-auto inline-block">
								{#if darkTheme}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="float-left h-6 w-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
										/>
									</svg>
								{:else}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="float-left h-6 w-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
										/>
									</svg>
								{/if}
								<p class="float-right pl-2">Switch to <u>{darkTheme ? 'Light' : 'Dark'}</u></p>
							</button>
						</div>

						<!-- TODO: Replace by if user -->
						{#if $user.user?.isValid}
							<p class="dropdown-item w-full px-3 py-2 text-center">Default</p>
							<div class="w-full border-b-2 border-b-zinc-300 dark:border-b-zinc-700" />
							<button
								class="dropdown-item w-full rounded-lg rounded-tl-none rounded-tr-none px-3 py-2 text-center hover:bg-zinc-200 dark:hover:bg-zinc-600"
								on:click={() => signOut()}>Sign Out</button
							>
						{:else}
							<div class="w-full border-b-2 dark:border-b-zinc-700" />
							<button
								class="dropdown-item w-full rounded-lg rounded-tl-none rounded-tr-none px-3 py-2 text-center hover:bg-zinc-200 dark:hover:bg-zinc-600"
								on:click={() => goto('/auth')}>Sign In</button
							>
						{/if}
					</ul>
				{/if}
			</div>
		</div>

		<!-- Search options -->
		<div class="flex justify-between">
			<div class:hidden={!showSearchOptions} class="items-centers mt-3 flex w-1/2">
				<!-- Category -->
				<div id="category" class="inline-block">
					<!-- Select -->
					<button
						class="inline-block rounded-xl bg-zinc-300 p-3 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600"
					>
						Category
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="inline-block h-6 w-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 8.25l-7.5 7.5-7.5-7.5"
							/>
						</svg>
					</button>
				</div>

				<!-- Price -->
				<!-- <div id="price" class="flex">
					<label
						for="min"
						class="h-5/6 p-2 align-middle rounded-xl rounded-tr-none rounded-br-none bg-zinc-200"
						>Min</label
					>
					<input
						id="min"
						type="text"
						bind:value={priceMin}
						class="mr-2 p-2 h-5/6 rounded-xl rounded-tl-none rounded-bl-none"
					/>

					<label
						for="max"
						class="ml-2 h-5/6 p-2 rounded-xl rounded-tr-none rounded-br-none bg-zinc-200">Max</label
					>
					<input
						id="max"
						type="text"
						bind:value={priceMin}
						class="h-5/6 p-2 rounded-xl rounded-tl-none rounded-bl-none"
					/>
				</div> -->

				<!-- Region -->
				<div id="region" class="inline-block ">
					<!-- Select -->
					<button
						class="inline-block rounded-xl bg-zinc-300 p-3 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600"
					>
						Région
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="inline-block h-6 w-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M19.5 8.25l-7.5 7.5-7.5-7.5"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
</nav>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap');

	* {
		font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
	}
</style>
