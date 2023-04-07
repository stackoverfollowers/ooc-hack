import '@/styles/globals.css';

import Head from 'next/head';
import { ReactElement, ReactNode, useState } from 'react';
import NextApp, { AppProps, AppContext } from 'next/app';
import { getCookie, setCookie } from 'cookies-next';
import {
	MantineProvider,
	ColorScheme,
	ColorSchemeProvider,
} from '@mantine/core';
import { NextPage } from 'next';
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';
import { useAppSelector } from '@/redux/hooks';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { useRouter } from 'next/router';
import { useUser } from '@/hooks/use-user';
import { persistor, store } from '@/redux/store';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
	auth?: boolean;
	roles?: string[];
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
	colorScheme: ColorScheme;
};

export default function App(props: AppPropsWithLayout) {
	const { Component, pageProps } = props;
	const [colorScheme, setColorScheme] = useState<ColorScheme>(
		props.colorScheme
	);

	const toggleColorScheme = (value?: ColorScheme) => {
		const nextColorScheme =
			value || (colorScheme === 'dark' ? 'light' : 'dark');
		setColorScheme(nextColorScheme);
		setCookie('mantine-color-scheme', nextColorScheme, {
			maxAge: 60 * 60 * 24 * 30,
		});
	};

	const getLayout = Component.getLayout ?? (page => page);

	return (
		<>
			<Head>
				<title>Page title</title>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width"
				/>
			</Head>

			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ColorSchemeProvider
						colorScheme={colorScheme}
						toggleColorScheme={toggleColorScheme}
					>
						<MantineProvider
							theme={{ colorScheme }}
							withGlobalStyles
							withNormalizeCSS
						>
							{Component.auth ? (
								<Auth roles={Component.roles || []}>
									{getLayout(<Component {...pageProps} />)}
								</Auth>
							) : (
								getLayout(<Component {...pageProps} />)
							)}
						</MantineProvider>
					</ColorSchemeProvider>
				</PersistGate>
			</Provider>
		</>
	);
}

App.getInitialProps = async (appContext: AppContext) => {
	const appProps = await NextApp.getInitialProps(appContext);
	return {
		...appProps,
		colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
	};
};

function Auth({ children, roles }: { children: any; roles: string[] }) {
	const router = useRouter();
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const { user, isLoading } = useUser({ skip: !isAuthenticated });

	if (!isAuthenticated) {
		router.replace('/login');
		return null;
	}

	if (isLoading) {
		return null;
	}

	if (roles.length > 0 && (!user || !roles.includes(user.role))) {
		router.replace('/');
		return null;
	}

	return children;
}
