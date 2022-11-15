import { error } from '@sveltejs/kit';

/**
 * If the slug is not null, return the content. If it is null, throw an error.
 * @returns The content of the slug.
 */
export function load({ params }: any) {
	if (params.slug != null) {
		return { username: params.slug };
	}

	throw error(404, 'User not found');
}
