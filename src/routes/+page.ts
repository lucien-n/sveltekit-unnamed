/**
 * If the user is not logged in, redirect them to the login page.
 * @param {any}  - params - The params object from the route.
 * @returns An object with a redirect property.
 */
export async function load({ params }: any) {
	return {
		redirect: '/home'
	};
}
