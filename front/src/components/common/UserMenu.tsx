import { Fragment, useState } from 'react';
import {
	UnstyledButton,
	Group,
	Text,
	Menu,
	createStyles,
	Avatar,
	MenuItemProps,
	Skeleton,
} from '@mantine/core';
import {
	FiChevronDown,
	FiGrid,
	FiHome,
	FiLogOut,
	FiSettings,
} from 'react-icons/fi';
import Link from 'next/link';
import { useAppDispatch } from '@/redux/hooks';
import { logOut } from '@/redux/slices/authSlice';
import { useUser } from '@/hooks/use-user';
import { IconType } from 'react-icons';

const useStyles = createStyles(theme => ({
	user: {
		padding: '2px 12px',
		borderRadius: theme.radius.sm,
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
		height: '30px',
		border: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[4]
		}`,
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[5]
					: theme.colors.gray[0],
		},
	},

	userActive: {
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
	},

	item: { height: '32px' },
}));

type Navigation = {
	label: string;
	href: string;
	component: any;
	icon: IconType;
}[][];

const UserMenu = () => {
	const { classes, cx } = useStyles();
	const [userMenuOpened, setUserMenuOpened] = useState(false);
	const dispatch = useAppDispatch();
	const { user, isLoading } = useUser();

	const handleLogOut = () => {
		dispatch(logOut());
	};

	const navigation: Navigation = [
		[
			{
				label: 'Главная',
				href: '/',
				icon: FiHome,
				component: Link,
			},
			{
				label: 'Обзор',
				href: `/board`,
				icon: FiGrid,
				component: Link,
			},
		],
		[
			{
				label: 'Настройки',
				href: `/profile`,
				icon: FiSettings,
				component: Link,
			},
		],
	];

	return (
		<Menu
			width={144}
			position="bottom-end"
			transitionProps={{ transition: 'pop-top-right' }}
			onClose={() => setUserMenuOpened(false)}
			onOpen={() => setUserMenuOpened(true)}
			withinPortal
			zIndex={51}
		>
			<Menu.Target>
				<UnstyledButton
					className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
				>
					<Group spacing={7}>
						{!isLoading && user ? (
							<>
								<Avatar src="/logo.svg" alt="logo" radius="xl" size={20} />
								<Text weight={500} size="sm" mr={3}>
									{user.username}
								</Text>
							</>
						) : (
							<>
								<Skeleton height={16} width={16} radius="xl" />
								<Skeleton height={16} width={32} />
							</>
						)}
						<FiChevronDown size="12" />
					</Group>
				</UnstyledButton>
			</Menu.Target>
			<Menu.Dropdown>
				{navigation.map((items, index) => (
					<Fragment key={index}>
						{items.map(item => (
							<Menu.Item
								key={item.href}
								className={classes.item}
								component={Link}
								href={item.href}
								icon={<item.icon size="16" />}
							>
								{item.label}
							</Menu.Item>
						))}
						{index !== navigation.length - 1 && <Menu.Divider />}
					</Fragment>
				))}

				<Menu.Item
					className={classes.item}
					onClick={handleLogOut}
					icon={<FiLogOut size="16" />}
				>
					Выйти
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export default UserMenu;
