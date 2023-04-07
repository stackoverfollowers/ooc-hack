import Layout from '@/components/common/Layout';
import Head from 'next/head';
import { ReactElement } from 'react';

const About = () => {
	return (
		<>
			<Head>
				<title>О нас – stackoverfollowers</title>
			</Head>
			<div>About Page</div>
		</>
	);
};

About.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default About;
