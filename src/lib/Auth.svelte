<script>
	import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import App from '$lib/firebase';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	// 0 => Sign In
	// 1 => Sign Up
	let currentForm = 0;

	let emailregex = new RegExp(
		'^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$'
	);
	let incorrectEmailFormat = false;
	let email = '';
	let password = '';

	function signInWithGoogle() {
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

	function signIn() {
		if (email == '' || password == '') return;
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

<div in:fade={{ duration: 350 }} class="w-full h-full flex pointer-events-none">
	<div
		class="mx-auto self-center w-fit px-5 py-4 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-700 pointer-events-auto"
	>
		<div class="flex justify-between">
			<button
				class="py-2 px-2 mx-auto text-xl font-bold text-center hover:text-black dark:hover:text-gray-300"
				on:click={() => (currentForm = 0)}
			>
				<h1>Sign In</h1>
				<hr class="h-px bg-zinc-600 dark:bg-white border-none" class:invisible={currentForm == 1} />
			</button>
			<button
				class="py-2 px-2 mx-auto text-xl font-bold text-center hover:text-black dark:hover:text-gray-300"
				on:click={() => (currentForm = 1)}
			>
				<h1>Sign Up</h1>
				<hr class="h-px bg-zinc-600 dark:bg-white border-none" class:invisible={currentForm == 0} />
			</button>
		</div>

		<div id="inputs" class="px-2 py-3">
			<div id="email">
				<span class="block text-lg"> Email </span>
				<span class="text-red-700" class:hidden={!incorrectEmailFormat}> Bad format </span>
				<input
					type="text"
					name="email"
					id="email"
					placeholder="jhondoe@mail.com"
					class="px-2 py-1 sm:px-3 block rounded-md sm:rounded-lg dark:bg-zinc-800 focus:outline-blue-500 outline-none outline-offset-0 text-lg border border-zinc-700"
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
					placeholder="••••••••"
					class="px-2 py-1 sm:px-3 block rounded-md sm:rounded-lg dark:bg-zinc-800 focus:outline-blue-500 outline-none outline-offset-0 text-lg border border-zinc-700"
					bind:value={password}
				/>
			</div>
		</div>

		<button
			class="px-3 py-2 my-2 mx-auto block rounded-md sm:rounded-lg border border-zinc-700 dark:hover:bg-zinc-800"
			on:click={signIn}
		>
			Sign {currentForm == 0 ? 'In' : 'Up'}
		</button>
		<hr class="w-4/5 h-px mx-auto bg-zinc-600 border-none" />
		<button
			class="px-3 py-2 my-2 mx-auto block rounded-md sm:rounded-lg border border-zinc-700 dark:hover:bg-zinc-800"
			on:click={signInWithGoogle}
		>
			Sign In with Google</button
		>
	</div>
</div>
