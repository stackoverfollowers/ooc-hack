import Layout from '@/components/common/Layout';
import { useUser } from '@/hooks/use-user';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';

const Boards = () => {
	const router = useRouter();

	const { user, isLoading } = useUser();

	useEffect(() => {
		if (!isLoading && user) {
			const { username } = router.query;
			if (username !== user.username) {
				router.push(`/u/${user.username}/boards`);
			}
		}
	}, [isLoading, user, router]);

	return (
		<>
			<Head>
				<title>Boards – stackoverfollowers</title>
			</Head>
			<div>Boards List Page</div>
		</>
	);
};

Boards.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

Boards.auth = true;

export default Boards;
