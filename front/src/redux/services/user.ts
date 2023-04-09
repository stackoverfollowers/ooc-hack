import { api } from './api';

export interface User {
	id: number;
	email: string;
	is_active: boolean;
	is_superuser: boolean;
	is_verified: boolean;
	// role: string;
}

export const userApi = api.injectEndpoints({
	endpoints: build => ({
		// getUser: build.query<User, void>({
		// 	query: () => `me`,
		// 	// providesTags: (result, error, id) => [{ type: 'User', id: 'me' }],
		// }),
		// updateUser: build.mutation<User, Pick<User, 'id'> & Partial<User>>({
		// 	query: ({ id, ...body }) => ({
		// 		url: `users/${id}`,
		// 		method: 'PUT',
		// 		body,
		// 	}),
		// 	async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
		// 		const patchResult = dispatch(
		// 			userApi.util.updateQueryData('getUser', undefined, draft => {
		// 				Object.assign(draft, patch);
		// 			})
		// 		);
		// 		try {
		// 			await queryFulfilled;
		// 		} catch {
		// 			patchResult.undo();
		// 			/**
		// 			 * Alternatively, on failure you can invalidate the corresponding cache tags
		// 			 * to trigger a re-fetch:
		// 			 * dispatch(api.util.invalidateTags(['Post']))
		// 			 */
		// 		}
		// 	},
		// 	invalidatesTags: (result, error, id) => [{ type: 'User', id: 'me' }],
		// }),
	}),
});

export const {} = userApi;
