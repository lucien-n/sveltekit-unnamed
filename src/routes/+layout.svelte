<script>
	import Nav from '$lib/Nav.svelte';
	import fb from '$lib/firebase';
	import { user } from '$lib/store';
	import { onAuthStateChanged } from 'firebase/auth';
	import { onMount } from 'svelte';

	onMount(() => {
		const auth = fb.auth();
		onAuthStateChanged(auth, (u) => {
			if (u) {
				console.info('User: ', u.uid);
				user.set(u);
			} else console.error('No user :/');
		});
	});
</script>

<div
	class="h-screen w-screen text-black transition duration-500 ease-in-out dark:bg-neutral-800 dark:text-gray-300"
>
	<Nav />
	<slot />
</div>
