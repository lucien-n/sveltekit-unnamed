<script>
	import '../../app.css';
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { clickOutside } from '$lib/clickOutside';
	import { signOut } from '$lib/pocketbase';
	import { sort, user } from '$lib/store';
	import { get } from 'svelte/store';

	const dispatch = createEventDispatcher();

	let darkTheme = false;
	const sorts = ['created', 'price', 'seller_name', 'title'];
	$: sort_direction = '+';
	$: sort_by = 'created';

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
		sort.set({ by: get(sort).by, direction: get(sort).direction, search: search });
	}

	function switchSortingDirection() {
		sort_direction = sort_direction === '+' ? '-' : '+';
		sort.set({ by: get(sort).by, direction: sort_direction, search: search });
	}

	function switchSortingBy() {
		let next_index = sorts.indexOf(sort_by) + 1;
		sort_by = next_index === sorts.length ? sorts[0] : sorts[next_index];
		sort.set({ by: sort_by, direction: get(sort).direction, search: get(sort).search });
	}
</script>

<nav class="fixed z-50 w-full p-1 transition duration-500 ease-in-out sm:p-3">
	<div
		class="mx-auto w-full rounded border border-zinc-700 bg-zinc-100 py-2 shadow-lg dark:bg-zinc-900 sm:p-2 lg:w-2/3"
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
				<!-- Sort Direction -->
				<button
					class="inline-block h-5/6 rounded-l-md border border-r-0 border-zinc-700 bg-white p-1 pr-2 dark:bg-zinc-800 sm:h-full sm:p-2 sm:pr-3"
					on:click={switchSortingDirection}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="inline-block h-6 w-6"
						class:hidden={sort_direction === '+'}
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
						/>
					</svg>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
						class:hidden={sort_direction === '-'}
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
						/>
					</svg>
				</button>

				<!-- Sort By -->
				<button
					class="inline-block h-5/6 border border-x-0 border-zinc-700 bg-white p-1 pr-2 dark:bg-zinc-800 sm:h-full sm:p-2 sm:pr-3"
					on:click={switchSortingBy}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="inline-block h-6 w-6"
						class:hidden={sort_by !== 'created'}
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
						/>
					</svg>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
						class:hidden={sort_by !== 'price'}
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
						/>
					</svg>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
						class:hidden={sort_by !== 'seller_name'}
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
						/>
					</svg>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="h-6 w-6"
						class:hidden={sort_by !== 'title'}
						><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line
							x1="12"
							y1="4"
							x2="12"
							y2="20"
						/></svg
					>
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
			<div id="listing" class="flex cursor-pointer" class:hidden={!$user}>
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
					class="py-3 pr-2"
				>
					<!-- <div
						class="absolute right-1 h-2 w-2 rounded-lg border-2 border-zinc-800 dark:border-zinc-300"
					/> -->
					<div
						class="absolute right-1 h-2 w-2 rounded-lg border border-zinc-800 dark:border-zinc-300"
						class:bg-green-500={$user}
						class:bg-red-500={!$user}
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

						{#if $user?.id}
							<p class="dropdown-item w-full px-3 py-2 text-center">{$user.username}</p>
							<div class="w-full border-b-2 border-b-zinc-300 dark:border-b-zinc-700" />
							<button
								class="dropdown-item w-full rounded-lg rounded-tl-none rounded-tr-none px-3 py-2 text-center hover:bg-zinc-200 dark:hover:bg-zinc-600"
								on:click={() => {
									signOut();
									showUserProfile = false;
								}}>Sign Out</button
							>
						{:else}
							<div class="w-full border-b-2 dark:border-b-zinc-700" />
							<button
								class="dropdown-item w-full rounded-lg rounded-tl-none rounded-tr-none px-3 py-2 text-center hover:bg-zinc-200 dark:hover:bg-zinc-600"
								on:click={() => {
									goto('/auth');
									showUserProfile = false;
								}}>Sign In</button
							>
						{/if}
					</ul>
				{/if}
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
