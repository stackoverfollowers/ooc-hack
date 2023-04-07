import React from 'react';
import { Navbar, Group, ThemeIcon, UnstyledButton, Text } from '@mantine/core';
import { FiLink } from 'react-icons/fi';

interface MainLinkProps {
	icon: React.ReactNode;
	color: string;
	label: string;
}

function MainLink({ icon, color, label }: MainLinkProps) {
	return (
		<UnstyledButton
			sx={theme => ({
				display: 'block',
				width: '100%',
				padding: theme.spacing.xs,
				borderRadius: theme.radius.sm,
				color:
					theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

				'&:hover': {
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[6]
							: theme.colors.gray[0],
				},
			})}
		>
			<Group>
				<ThemeIcon color={color} variant="light">
					{icon}
				</ThemeIcon>

				<Text size="sm">{label}</Text>
			</Group>
		</UnstyledButton>
	);
}

const data = [
	{ icon: <FiLink size="16" />, color: 'blue', label: 'Pull Requests' },
	{ icon: <FiLink size="16" />, color: 'teal', label: 'Open Issues' },
	{ icon: <FiLink size="16" />, color: 'violet', label: 'Discussions' },
	{ icon: <FiLink size="16" />, color: 'grape', label: 'Databases' },
];

const DashboardNavbar = ({ opened }: { opened: boolean }) => {
	const links = data.map(link => <MainLink {...link} key={link.label} />);

	return (
		<Navbar hidden={!opened} p="md" hiddenBreakpoint="sm" width={{ sm: 226 }}>
			<Navbar.Section grow mt="xs">
				<div>{links}</div>
			</Navbar.Section>
		</Navbar>
	);
};

export default DashboardNavbar;
