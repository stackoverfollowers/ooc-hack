import Layout from '@/components/common/Layout';
import Head from 'next/head';
import { ReactElement } from 'react';

const ProfilePage = () => {
	return (
		<>
			<Head>
				<title>Профиль – stackoverfollowers</title>
			</Head>
			<div>Profile Page</div>
		</>
	);
};

ProfilePage.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

ProfilePage.auth = true;

export default ProfilePage;
