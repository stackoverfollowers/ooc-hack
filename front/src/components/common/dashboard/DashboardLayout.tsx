import { ReactNode, useState } from 'react';
import {
	AppShell,
	Header,
	Group,
	createStyles,
	useMantineTheme,
	Text,
	Burger,
} from '@mantine/core';
import DashboardSidebar from './DashboardSidebar';
import UserMenu from '../UserMenu';
import ThemeSwitcher from '../ThemeSwitcher';
import { Navigation } from '../Navbar';
import Link from 'next/link';
import { useRouter } from 'next/router';

const useStyles = createStyles(theme => ({
	link: {
		display: 'block',
		lineHeight: 1,
		padding: `8px 12px`,
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[6]
					: theme.colors.gray[0],
		},
		[theme.fn.smallerThan('sm')]: {
			borderRadius: 0,
			fontSize: theme.fontSizes.lg,
			padding: theme.spacing.md,
		},
	},

	linkActive: {
		'&, &:hover': {
			backgroundColor: theme.fn.variant({
				variant: 'light',
				color: theme.primaryColor,
			}).background,
			color: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
				.color,
		},
	},

	hiddenMobile: { [theme.fn.smallerThan('sm')]: { display: 'none' } },
	hiddenDesktop: { [theme.fn.largerThan('sm')]: { display: 'none' } },
}));

export default function DashboardLayout({ children }: { children: ReactNode }) {
	const theme = useMantineTheme();
	const router = useRouter();
	const { classes, cx } = useStyles();
	const [opened, setOpened] = useState(false);

	let navigation: Navigation = [
		{ label: 'Реестр', href: '/board' },
		{ label: 'Архив', href: '#' },
	];

	const items = navigation.map(({ label, href }) => (
		<Link
			key={label}
			href={href}
			className={cx(classes.link, {
				[classes.linkActive]: router.pathname === href,
			})}
		>
			{label}
		</Link>
	));

	return (
		<AppShell
			styles={{
				main: {
					background:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			}}
			navbarOffsetBreakpoint="sm"
			asideOffsetBreakpoint="sm"
			navbar={<DashboardSidebar opened={opened} />}
			header={
				<Header height={60} p="md" zIndex={50}>
					<Group position="apart">
						<Group>
							<Burger
								opened={opened}
								onClick={() => setOpened(o => !o)}
								size="sm"
								className={classes.hiddenDesktop}
							/>
							<Group className={classes.hiddenMobile}>{items}</Group>
						</Group>
						<Group>
							<ThemeSwitcher />
							<UserMenu />
						</Group>
					</Group>
				</Header>
			}
		>
			{children}
		</AppShell>
	);
}
