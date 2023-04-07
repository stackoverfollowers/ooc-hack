import Layout from '@/components/common/Layout';
import Head from 'next/head';
import { ReactElement } from 'react';

const Docs = () => {
	return (
		<>
			<Head>
				<title>Документация – stackoverfollowers</title>
			</Head>
			<div>Docs Page</div>
		</>
	);
};

Docs.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Docs;
