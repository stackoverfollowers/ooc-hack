import { api } from '@/redux/services/api';

export type SingleWorkingGroupRequest = {
	id: number;
};

export type SingleWorkingGroupResponse = {
	//TODO
	id: number;
};

export const workingGroupsApi = api.injectEndpoints({
	endpoints: build => ({
		getWorkingGroupById: build.query<SingleWorkingGroupResponse, void>({
			query: id => ({
				url: `/working-group/${id}`,
				method: 'GET',
			}),
			providesTags: ['CurrentWorkingGroup'],
		}),
	}),
});

export const { useGetWorkingGroupByIdQuery } = workingGroupsApi;
