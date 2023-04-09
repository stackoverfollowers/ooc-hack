import { User } from './user';
import { api } from './api';

export type AuthResponse = {
	access_token: string;
	refresh_token: string;
	user: User;
};

export interface AuthRequest {
	email: string;
	password: string;
}

export const authApi = api.injectEndpoints({
	endpoints: build => ({
		register: build.mutation<AuthResponse, AuthRequest>({
			query: credentials => ({
				url: '/auth/register',
				method: 'POST',
				body: credentials,
			}),
		}),
		login: build.mutation<AuthResponse, AuthRequest>({
			query: ({ email, password }) => {
				const data = new URLSearchParams();
				data.append('username', email);
				data.append('password', password);
				return {
					url: '/auth/jwt/login',
					method: 'POST',
					body: data,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Access-Control-Allow-Credentials': 'true',
					},
				};
			},
			invalidatesTags: ['Auth'],
		}),
		getUser: build.query<User, void>({
			query: () => `/users/me`,
			providesTags: ['Auth'],
		}),
	}),
});

export const { useLoginMutation, useRegisterMutation, useGetUserQuery } =
	authApi;
