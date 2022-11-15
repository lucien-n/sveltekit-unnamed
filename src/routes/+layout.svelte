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

<Nav />
<slot />
