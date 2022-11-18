<script>
	import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import App from '$lib/firebase';
	import { goto } from '$app/navigation';

	// 0 => Sign In
	// 1 => Sign Up
	let currentForm = 0;

	let emailregex = new RegExp(
		'^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'
	);
	let incorrectEmailFormat = false;
	let email = '';
	let password = '';

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

	function checkEmail() {
		if (email == '') {
			incorrectEmailFormat = false;
			return;
		}

		if (email.match(emailregex)) incorrectEmailFormat = false;
		else incorrectEmailFormat = true;
	}
</script>

<div class="absolute top-0 left-0 w-full h-full flex justify-center pointer-events-none">
	<div class="flex h-fit my-auto">
		<div class="px-5 py-4 rounded-lg bg-white shadow-lg border border-zinc-700 dark:bg-zinc-900 pointer-events-auto">
			<div class="flex justify-between">
				<button
					class="py-2 px-2 mx-auto text-xl font-bold text-center hover:text-black dark:hover:text-gray-300"
					on:click={() => (currentForm = 0)}
				>
					<h1>Sign In</h1>
				</button>
				<button
					class="py-2 px-2 mx-auto text-xl font-bold text-center hover:text-black dark:hover:text-gray-300"
					on:click={() => (currentForm = 1)}
				>
					<h1>Sign Up</h1>
				</button>
			</div>
			<hr class="h-px bg-zinc-600 border-none" />

			<div id="inputs" class="px-2 py-3">
				<div id="email">
					<span class="block text-lg"> Email </span>
					<span class="text-red-700" class:hidden={!incorrectEmailFormat}> Bad format </span>
					<input
						type="text"
						name="email"
						id="email"
						placeholder="jhondoe@mail.com"
						class="px-1 sm:px-2 block rounded-md sm:rounded-lg dark:bg-zinc-700 focus:outline-blue-500 outline-none outline-offset-0 text-lg"
						bind:value={email}
						on:input={checkEmail}
					/>
				</div>
				<br />
				<div id="password">
					<span class="block text-lg"> Password </span>
					<span class="block text-zinc-500"> 8 characters minimum </span>
					<input
						type="password"
						name="password"
						id="password"
						placeholder=""
						class="px-1 sm:px-2 block rounded-md sm:rounded-lg dark:bg-zinc-700 focus:outline-blue-500 outline-none outline-offset-0 text-lg"
						bind:value={password}
					/>
				</div>
			</div>

			<button class="pointer-events-auto " on:click={signIn}> Connexion avec Google</button>
		</div>
	</div>
</div>
