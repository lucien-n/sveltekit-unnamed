import { pb } from '$lib/pocketbase';
import { user } from '$lib/store';

pb.authStore.onChange(async (token: string, model: any) => {
	if (!model) {
		user.set(pb.authStore.model);
		return;
	}
	user.set(await pb.collection('users').getOne(model.id));
});

export async function load() {
	return {
		listings: await pb.collection('listings').getList(1, 50, {
			sort: 'created'
		})
	};
}
