import { Text, Paper, Stack, Center } from '@mantine/core';
import { ReactElement, useEffect } from 'react';
import Logo from '@/components/ui/Logo';
import Layout from '@/components/common/Layout';
import { useAppSelector } from '@/redux/hooks';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { useRouter } from 'next/router';
import Head from 'next/head';
import dynamic from 'next/dynamic';

const LoginView = dynamic(() => import('@/components/auth/LoginView'), {
	loading: () => null,
});

const Login = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);
	const router = useRouter();

	useEffect(() => {
		if (isAuthenticated) {
			router.replace('/');
		}
	}, [isAuthenticated, router]);

	if (isAuthenticated) {
		return null;
	}

	return (
		<>
			<Head>
				<title>Вход – stackoverfollowers</title>
			</Head>
			<Center h="100%">
				<Paper p="lg" withBorder miw={360}>
					<Stack align="center" spacing={0}>
						<Logo w={64} h={64} />
						<Text size={28} fw={500} ta="center" mb={24}>
							Вход в аккаунт
						</Text>
					</Stack>

					<LoginView />
				</Paper>
			</Center>
		</>
	);
};

Login.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Login;
