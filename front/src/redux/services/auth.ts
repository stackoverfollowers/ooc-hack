import { User } from './user';
import { api } from './api';

export type AuthResponse = {
	access_token: string;
	refresh_token: string;
	user: User;
};

export interface AuthRequest {
	username: string;
	password: string;
}

export const authApi = api.injectEndpoints({
	endpoints: build => ({
		login: build.mutation<AuthResponse, AuthRequest>({
			query: credentials => ({
				url: '/login',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: ['Auth'],
		}),
		getUser: build.query<User, void>({
			query: () => `me`,
			providesTags: ['Auth'],
		}),
	}),
});

export const { useLoginMutation, useGetUserQuery } = authApi;
