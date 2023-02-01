import { pb } from '$lib/pocketbase';
import { user } from '$lib/store';

pb.authStore.onChange(async (token: string, model: any) => {
	user.set(await pb.collection('users').getOne(model.id));
});
