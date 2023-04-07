import { logOut, setCredentials } from '../slices/authSlice';
import { RootState } from '../store';
import {
	createApi,
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const { accessToken } = (getState() as RootState).auth;
		if (accessToken && !headers.has('Authorization')) {
			headers.set('Authorization', `Bearer ${accessToken}`);
		}
		return headers;
	},
});

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 422) {
		// try to get a new token
		const refreshResult = (await baseQuery(
			{
				url: '/refresh',
				headers: {
					Authorization: `Bearer ${
						(api.getState() as RootState).auth.refreshToken
					}`,
				},
			},
			api,
			extraOptions
		)) as any;

		if (refreshResult.data) {
			// store the new token
			const { auth } = api.getState() as RootState;
			api.dispatch(setCredentials({ ...auth.user, ...refreshResult.data }));

			// retry the initial query
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logOut());
		}
	}
	return result;
};

/**
 * Create a base API to inject endpoints into elsewhere.
 * Components using this API should import from the injected site,
 * in order to get the appropriate types,
 * and to ensure that the file injecting the endpoints is loaded
 */
export const api = createApi({
	/**
	 * `reducerPath` is optional and will not be required by most users.
	 * This is useful if you have multiple API definitions,
	 * e.g. where each has a different domain, with no interaction between endpoints.
	 * Otherwise, a single API definition should be used in order to support tag invalidation,
	 * among other features
	 */
	reducerPath: 'splitApi',
	/**
	 * A bare bones base query would just be `baseQuery: fetchBaseQuery({ baseUrl: '/' })`
	 */
	baseQuery: baseQueryWithReauth,
	/**
	 * Tag types must be defined in the original API definition
	 * for any tags that would be provided by injected endpoints
	 */
	tagTypes: ['Auth', 'User'],
	/**
	 * This api has endpoints injected in adjacent files,
	 * which is why no endpoints are shown below.
	 * If you want all endpoints defined in the same file, they could be included here instead
	 */
	endpoints: () => ({}),
});
