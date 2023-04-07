import { ReactNode } from 'react';
import { Container, createStyles } from '@mantine/core';
import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('./Footer'), {
	loading: () => null,
});

const Navbar = dynamic(() => import('./Navbar'), {
	loading: () => null,
});

const useStyles = createStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
	},

	main: {
		flex: 1,
		backgroundColor: `${
			theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]
		}`,
	},

	container: {
		paddingTop: theme.spacing.lg,
		paddingBottom: theme.spacing.lg,
		height: '100%',
		[theme.fn.smallerThan('sm')]: {
			paddingTop: theme.spacing.md,
			paddingBottom: theme.spacing.md,
		},
	},
}));

export default function Layout({ children }: { children: ReactNode }) {
	const { classes } = useStyles();

	return (
		<div className={classes.root}>
			<Navbar />

			<main className={classes.main}>
				<Container className={classes.container}>{children}</Container>
			</main>
			<Footer />
		</div>
	);
}
