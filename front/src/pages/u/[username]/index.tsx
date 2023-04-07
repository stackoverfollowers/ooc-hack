import Layout from '@/components/common/Layout';
import Head from 'next/head';
import { ReactElement } from 'react';

const UserProfile = () => {
	return (
		<>
			<Head>
				<title>Профиль – stackoverfollowers</title>
			</Head>
			<div>Profile Page</div>
		</>
	);
};

UserProfile.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

UserProfile.auth = true;

export default UserProfile;
