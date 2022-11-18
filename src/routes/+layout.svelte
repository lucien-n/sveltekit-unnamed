<script>
	import Nav from '$lib/Nav.svelte';
	import { getAuth, onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';

	onMount(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) console.info('User: ', user.uid);
			else console.error('No user :/');
		});
	});
</script>

<div
	class="w-screen h-screen text-black dark:bg-neutral-800 dark:text-gray-300 transition ease-in-out duration-500"
	>
	<Nav />
	<slot />
</div>

