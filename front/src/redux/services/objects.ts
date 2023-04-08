import { api } from '@/redux/services/api';

export type SingleObjectRequest = {
	id: number;
};

export type SingleObjectResponse = {
	district: string; //округ
	region: string; //район
	address: string;
	type: string;
	state: string;
	area: string;
	owner: string;
	actualUser: string;
	photos: string[];
};
export const objectsApi = api.injectEndpoints({
	endpoints: builder => ({
		getObjectById: builder.query<SingleObjectResponse, void>({
			query: id => ({
				url: `/object/${id}`,
				method: 'GET',
			}),
			providesTags: ['CurrentObject'],
		}),
	}),
});

export const { useGetObjectByIdQuery } = objectsApi;
