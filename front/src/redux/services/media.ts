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

interface Response {}

export const mediaApi = api.injectEndpoints({
	endpoints: build => ({
		uploadMedia: build.mutation<Response, FormData>({
			query(body) {
				return {
					url: `/contents`,
					method: 'POST',
					body,
				};
			},
			// invalidatesTags: [{ type: 'Media', id: 'Media-LIST' }],
		}),
		getMedia: build.query<Response, string>({
			query: id => `/contents/${id}`,
			providesTags: (result, error, id) => [{ type: 'Media', id }],
		}),
		downloadMedia: build.mutation<Response, string>({
			query: id => `/contents/${id}/download`,
		}),
		updateTarget: build.mutation<Response, Partial<any>>({
			query(data) {
				const { id, ...body } = data;
				return {
					url: `/contents/${id}`,
					method: 'PUT',
					body,
				};
			},
			invalidatesTags: (result, error, { id }) => [{ type: 'Media', id }],
		}),
		deleteMedia: build.mutation<Response, string>({
			query(id) {
				return {
					url: `/contents/${id}`,
					method: 'DELETE',
				};
			},
			invalidatesTags: (result, error, id) => [{ type: 'Media', id }],
		}),
	}),
});

export const {
	useGetMediaQuery,
	useUploadMediaMutation,
	useDownloadMediaMutation,
	useUpdateTargetMutation,
	useDeleteMediaMutation,
} = mediaApi;
