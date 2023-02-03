<script lang="ts">
	import { fade } from 'svelte/transition';

	export let type: string;

	let show = true;
</script>

{#if show}
	<dialog
		open
		in:fade={{ duration: 300 }}
		out:fade={{ duration: 300 }}
		class="z-50 mx-auto mt-2 h-fit w-full rounded-lg border border-zinc-700 py-2 px-4 shadow-lg md:w-2/3"
		class:bg-green-500={type == 'success'}
		class:bg-red-400={type == 'error'}
		class:bg-yellow-300={type == 'warning'}
		class:bg-blue-500={type == 'info'}
	>
		<header>
			<slot name="title">Missing alert title</slot>
		</header>
		<slot name="content">Missinc alert content</slot>
		<button class="absolute right-0 top-0 p-3" on:click={() => (show = false)}
			><svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="h-6 w-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
	</dialog>
{/if}
