<script lang="ts">
	export let title: string;
	export let description: string;
	export let price: Float32Array;
	export let seller_uid: string;
	export let category: string;
</script>

<div class="listing">
	{{ title }}
	{{ description }}
	{{ price }}
	{{ seller_uid }}
	{{ category }}
</div>
