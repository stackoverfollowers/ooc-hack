import { api } from './api';

export interface Target {
	id: number;
	user_id: number;
	updated_at: number;
	created_at: number;
	square: number;
	district: string;
	area: string;
	address: string;
	status_id: number;
	target_type_id: number;
}

interface ListResponse<T> {
	items: T[];
	total: number;
	page: number;
	size: number;
	pages: number;
}

interface PaginationQuery {
	preprocessed: boolean;
	page: number;
	size: number;
}

export const targetApi = api.injectEndpoints({
	endpoints: build => ({
		getTargets: build.query<ListResponse<Target>, PaginationQuery>({
			query: () => '/targets',
			providesTags: result =>
				result
					? [
							...result.items.map(
								({ id }) => ({ type: 'Targets', id } as const)
							),
							{ type: 'Targets', id: 'TARGETS-LIST' },
					  ]
					: [{ type: 'Targets', id: 'TARGETS-LIST' }],
		}),
		addPost: build.mutation<Target, Partial<Target>>({
			query(body) {
				return {
					url: `/target`,
					method: 'POST',
					body,
				};
			},
			invalidatesTags: [{ type: 'Targets', id: 'TARGETS-LIST' }],
		}),
		getTarget: build.query<Target, string>({
			query: id => `/target/${id}`,
			providesTags: (result, error, id) => [{ type: 'Targets', id }],
		}),
		updateTarget: build.mutation<Target, Partial<Target>>({
			query(data) {
				const { id, ...body } = data;
				return {
					url: `/target/${id}`,
					method: 'PUT',
					body,
				};
			},
			invalidatesTags: (result, error, { id }) => [{ type: 'Targets', id }],
		}),
		deleteTarget: build.mutation<any, number>({
			query(id) {
				return {
					url: `/target/${id}`,
					method: 'DELETE',
				};
			},
			invalidatesTags: (result, error, id) => [{ type: 'Targets', id }],
		}),
	}),
});

export const {
	useGetTargetQuery,
	useGetTargetsQuery,
	useAddPostMutation,
	useUpdateTargetMutation,
	useDeleteTargetMutation,
} = targetApi;
