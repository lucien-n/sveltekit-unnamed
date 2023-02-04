import { pb } from '$lib/pocketbase';
import { user } from '$lib/store';
import { get } from 'svelte/store';

pb.authStore.onChange(async (token: string, model: any) => {
	if (!model) {
		user.set(pb.authStore.model);
		return;
	}
	user.set(await pb.collection('users').getOne(model.id));
});

export async function load() {
	return {
		listings: await pb.collection('listings').getFullList(10, {
			sort: 'created'
		})
	};
}
