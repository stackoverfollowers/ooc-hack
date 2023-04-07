import {
	createStyles,
	Header,
	Container,
	Group,
	Burger,
	Button,
	Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import UserMenu from './UserMenu';
import { useAppSelector } from '@/redux/hooks';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import ThemeSwitcher from './ThemeSwitcher';
import Logo from '../ui/Logo';

const useStyles = createStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
	},

	navigation: { [theme.fn.smallerThan('sm')]: { display: 'none' } },

	burger: { [theme.fn.largerThan('sm')]: { display: 'none' } },

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

	dropdown: {
		position: 'absolute',
		top: 60,
		left: 0,
		right: 0,
		zIndex: 0,
		overflow: 'hidden',
		height: `calc(100% - 60px)`,
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
		[theme.fn.largerThan('sm')]: { display: 'none' },
	},

	hiddenMobile: { [theme.fn.smallerThan('sm')]: { display: 'none' } },
	hiddenDesktop: { [theme.fn.largerThan('sm')]: { display: 'none' } },
}));

export type Navigation = {
	href: string;
	label: string;
}[];

const Navbar = () => {
	const router = useRouter();
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	let navigation: Navigation = [
		{ label: 'Главная', href: '/' },
		{ label: 'Документация', href: '/docs' },
		{ label: 'О нас', href: '/about' },
	];

	const [opened, { toggle }] = useDisclosure(false);
	const { classes, cx } = useStyles();

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
		<Header height={60} zIndex={50}>
			<Container className={classes.container}>
				<Logo Component={Link} href="/" />
				<Group spacing={5} className={classes.navigation}>
					{items}
				</Group>

				<Burger
					opened={opened}
					onClick={toggle}
					className={classes.burger}
					size="sm"
				/>

				<Group className={classes.hiddenMobile}>
					<ThemeSwitcher />
					{!isAuthenticated ? (
						<Button component={Link} href="/login" h={30}>
							Вход
						</Button>
					) : (
						<UserMenu />
					)}
				</Group>

				{opened && (
					<div className={classes.dropdown}>
						<>{items}</>
						<Divider my={16} mx={16} />
						<Group px={16}>
							<ThemeSwitcher />
							{!isAuthenticated ? (
								<Button
									component={Link}
									href="/login"
									h={30}
									className={classes.hiddenDesktop}
									style={{ flex: 1 }}
								>
									Вход
								</Button>
							) : (
								<UserMenu />
							)}
						</Group>
					</div>
				)}
			</Container>
		</Header>
	);
};

export default Navbar;
