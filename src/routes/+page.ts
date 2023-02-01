import { pb } from '$lib/pocketbase';
import { user } from '$lib/store';

pb.authStore.onChange((token: string, model: any) => {
	console.log(model);
	user.set();
});
