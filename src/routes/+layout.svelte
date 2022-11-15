<script>
	import Nav from '$lib/Nav.svelte';
	import App from '$lib/firebase';
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
	class="w-full h-full text-black dark:bg-zinc-800 dark:text-gray-300 transition ease-in-out duration-500"
>
	<Nav />
	<slot />
</div>
