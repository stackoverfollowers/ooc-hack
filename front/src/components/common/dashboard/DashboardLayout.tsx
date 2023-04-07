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
import DashboardNavbar from './DashboardNavbar';
import UserMenu from '../UserMenu';
import ThemeSwitcher from '../ThemeSwitcher';

const useStyles = createStyles(theme => ({
	hiddenMobile: { [theme.fn.smallerThan('sm')]: { display: 'none' } },
	hiddenDesktop: { [theme.fn.largerThan('sm')]: { display: 'none' } },
}));

export default function DashboardLayout({ children }: { children: ReactNode }) {
	const [opened, setOpened] = useState(false);
	const theme = useMantineTheme();
	const { classes, cx } = useStyles();

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
			navbar={<DashboardNavbar opened={opened} />}
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
							<Text size="xl" fw={500}>
								Обзор
							</Text>
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
