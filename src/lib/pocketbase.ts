import PocketBase from 'pocketbase';
import { goto } from '$app/navigation';

export const pb = new PocketBase('http://127.0.0.1:8090');

export async function signInWithEmailAndPassword(email: string, password: string) {
	try {
		await pb.collection('users').authWithPassword(email, password);
		goto('/');
	} catch (error) {
		console.error(error);
	}
}

export async function signUpWithEmailAndPassword(email: string, password: string) {
	email = email.toLowerCase();
	try {
		await pb.collection('users').create({
			username: email.split('@')[0],
			email: email,
			name: email.split('@')[0].split('.')[0],
			password: password,
			passwordConfirm: password
		});
		goto('/');
	} catch (error) {
		console.error(error);
	}
}

export function signOut() {
	pb.authStore.clear();
}
