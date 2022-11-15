<script>
	import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import App from '$lib/firebase';

	function signIn() {
		const auth = getAuth();
		signInWithPopup(auth, App.googleAuthProvider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				const user = result.user;

				console.info(credential);
				console.info(token);
				console.info(user);
			})
			.catch((error) => {
				console.error(error);
			});
	}
</script>

<button on:click={signIn}> Connexion avec Google</button>
