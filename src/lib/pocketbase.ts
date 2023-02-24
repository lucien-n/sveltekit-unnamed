import PocketBase from 'pocketbase';
import { goto } from '$app/navigation';

const url = 'https://leptitcoin.pockethost.io';
export const pb = new PocketBase(url);

export async function signInWithEmailAndPassword(email: string, password: string) {
	try {
		await pb.collection('users').authWithPassword(email, password);
		goto('/');
	} catch (error) {
		console.error(error);
	}
}

export async function signUpWithEmailAndPassword(email: string, password: string, address: string) {
	email = email.toLowerCase();
	try {
		await pb.collection('users').create({
			username: email.split('@')[0],
			email: email,
			name: email.split('@')[0].split('.')[0],
			address: address,
			password: password,
			passwordConfirm: password
		});
		signInWithEmailAndPassword(email, password);
	} catch (error) {
		console.error(error);
	}
}

export function signOut() {
	goto('/');
	pb.authStore.clear();
}
