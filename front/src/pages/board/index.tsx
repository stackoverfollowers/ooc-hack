import DashboardLayout from '@/components/common/dashboard/DashboardLayout';
import { createStyles } from '@mantine/core';
import Head from 'next/head';
import { ReactElement } from 'react';

import dynamic from 'next/dynamic';

const Board = dynamic(() => import('@/components/board/Board'), {
	loading: () => null,
});

const useStyles = createStyles(theme => ({
	content: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		gap: '10px',
	},
}));

const BoardPage = () => {
	const { classes } = useStyles();

	return (
		<>
			<Head>
				<title>BoardName – stackoverfollowers</title>
			</Head>
			<Board />
		</>
	);
};

BoardPage.getLayout = function getLayout(page: ReactElement) {
	return <DashboardLayout sidebar>{page}</DashboardLayout>;
};

BoardPage.auth = false;

export default BoardPage;
