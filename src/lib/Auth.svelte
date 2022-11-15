<script>
	import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import App from '$lib/firebase';
	import { goto } from '$app/navigation';

	function signIn() {
		const auth = getAuth();
		signInWithPopup(auth, App.googleAuthProvider)
			.then((result) => {
				const user = result.user;
				if (user) console.info('Logged in successfully');
				goto('/');
			})
			.catch((error) => {
				console.error(error);
			});
	}
</script>

<div class="absolute top-0 left-0 w-full h-full flex justify-center pointer-events-none">
	<div class="flex h-fit my-auto">
		<button
			class="pointer-events-auto p-4 rounded-xl bg-zinc-100 hover:bg-green-100 dark:bg-zinc-900 dark:hover:bg-green-900"
			on:click={signIn}
		>
			Connexion avec Google</button
		>
	</div>
</div>
