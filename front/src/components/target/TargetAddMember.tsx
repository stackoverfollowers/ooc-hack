import {
	Avatar,
	Button,
	Center,
	CloseButton,
	Divider,
	Group,
	Popover,
	Stack,
	Text,
	TextInput,
	UnstyledButton,
	createStyles,
} from '@mantine/core';
import { useState } from 'react';
import { FiUser } from 'react-icons/fi';

const useStyles = createStyles(theme => ({
	members: {
		display: 'flex',
		flexDirection: 'column',
		gap: '8px',
	},
	member: {
		display: 'flex',
		alignItems: 'center',
		gap: 8,
		padding: 4,
		borderRadius: 4,
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[6]
				: theme.colors.gray[1],
		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[5]
					: theme.colors.gray[2],
		},
	},

	close: {
		position: 'absolute',
		right: 14,
		top: 14,
	},
}));

const TargetAddMembers = () => {
	const { classes } = useStyles();
	const [opened, setOpened] = useState(false);

	return (
		<Popover
			width={300}
			trapFocus
			position="bottom-end"
			shadow="md"
			opened={opened}
			onChange={setOpened}
		>
			<Popover.Target>
				<Button
					variant="light"
					color="gray"
					leftIcon={<FiUser />}
					styles={{ inner: { justifyContent: 'flex-start' } }}
					onClick={() => setOpened(o => !o)}
				>
					Участники
				</Button>
			</Popover.Target>
			<Popover.Dropdown
				p="xs"
				sx={theme => ({
					background:
						theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
				})}
			>
				<Center>
					<Text>Участники</Text>
				</Center>
				<CloseButton
					className={classes.close}
					onClick={() => setOpened(false)}
				/>

				<Divider my={8} />
				<Stack>
					<TextInput placeholder="Поиск участников" />

					<div className={classes.members}>
						<Text size="sm">Участники объекта</Text>
						<UnstyledButton className={classes.member}>
							<Avatar color="blue" variant="filled" size={32} radius="xl">
								MK
							</Avatar>
							<Text size="sm">John Doe (john@mail.com)</Text>
						</UnstyledButton>
					</div>
				</Stack>
			</Popover.Dropdown>
		</Popover>
	);
};

export default TargetAddMembers;
