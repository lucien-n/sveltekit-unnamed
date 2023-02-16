<script>
	import { page } from '$app/stores';
</script>

<div class="flex h-full w-full">
	<h1 class=" w-full self-center text-center text-xl text-zinc-800 dark:text-zinc-300">
		{$page.error?.message}
	</h1>
</div>
