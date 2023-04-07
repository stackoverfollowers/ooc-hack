import Layout from '@/components/common/Layout';
import Head from 'next/head';
import { ReactElement } from 'react';

const Home = () => {
	return (
		<>
			<Head>
				<title>Главная – stackoverfollowers</title>
			</Head>
			<div>Home Page</div>
		</>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
