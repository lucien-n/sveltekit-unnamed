import { writable } from 'svelte/store';
import { pb } from '$lib/pocketbase';

export const user = writable(pb.authStore.model);
export const sort = writable({ by: 'created', direction: '' });
