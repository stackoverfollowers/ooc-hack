import {
	Avatar,
	Button,
	Center,
	Checkbox,
	CloseButton,
	Divider,
	FocusTrap,
	Group,
	List,
	Popover,
	Progress,
	Stack,
	Text,
	TextInput,
	Textarea,
	UnstyledButton,
	createStyles,
} from '@mantine/core';
import { useState } from 'react';
import { FiCheckSquare, FiClock, FiUser } from 'react-icons/fi';

const useStyles = createStyles(theme => ({
	title: {
		display: 'flex',
		alignItems: 'center',
		gap: 16,
	},
	button: {
		display: 'flex',
		alignItems: 'center',
		flex: 1,
		width: '100%',
		borderRadius: theme.radius.sm,
		padding: 8,
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
		'&:hover': {
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[5]
					: theme.colors.gray[1],
		},
	},
	task: {
		paddingLeft: 40,
		position: 'relative',
	},
	checkbox: {
		position: 'absolute',
		left: 0,
		top: 0,
		textAlign: 'center',
		margin: '6px',
	},
}));

interface TaskProps {
	onEdit: () => void;
}

const Task = ({ onEdit }: TaskProps) => {
	const { classes } = useStyles();
	const [collapse, setCollapse] = useState(false);

	return (
		<Group spacing={8} className={classes.task}>
			<Checkbox onChange={() => {}} className={classes.checkbox} />
			{collapse ? (
				<Stack spacing={8} style={{ flex: 1 }}>
					<FocusTrap>
						<Textarea placeholder="Добавить элемент" />
					</FocusTrap>
					<Group position="apart">
						<Group spacing={8}>
							<Button>Сохранить</Button>
							<CloseButton
								onClick={() => setCollapse(false)}
								color="gray"
								variant="subtle"
								size="md"
							/>
						</Group>

						<Group spacing={8}>
							<Button leftIcon={<FiUser />} color="gray" variant="light">
								Назначить
							</Button>
							<Button leftIcon={<FiClock />} color="gray" variant="light">
								Срок
							</Button>
						</Group>
					</Group>
				</Stack>
			) : (
				<UnstyledButton
					onClick={() => {
						setCollapse(true);
						onEdit();
					}}
					className={classes.button}
				>
					<Text size="xs">test test test</Text>
				</UnstyledButton>
			)}
		</Group>
	);
};

const TargetTasklist = () => {
	const { classes } = useStyles();
	const [collapse, setCollapse] = useState(false);

	return (
		<form>
			<div className={classes.title}>
				<FiCheckSquare size={20} />
				<Group>
					<Text fw={600}>Задачи</Text>
				</Group>
			</div>

			<Stack mt={5}>
				<Progress
					label={`${((23 / 36) * 100).toFixed(0)}%`}
					value={(23 / 36) * 100}
					size="xl"
				/>

				<Stack spacing={8}>
					{[...Array(2)].map((_, index) => (
						<Task onEdit={() => setCollapse(false)} key={index} />
					))}
				</Stack>
			</Stack>

			<Group mt={24}>
				{collapse ? (
					<Stack spacing={8} w="100%">
						<FocusTrap>
							<Textarea placeholder="Добавить элемент" />
						</FocusTrap>
						<Group position="apart">
							<Group spacing={8}>
								<Button>Добавить</Button>
								<Button
									onClick={() => setCollapse(false)}
									color="gray"
									variant="subtle"
								>
									Отмена
								</Button>
							</Group>

							<Group spacing={8}>
								<Button leftIcon={<FiUser />} color="gray" variant="light">
									Назначить
								</Button>
								<Button leftIcon={<FiClock />} color="gray" variant="light">
									Срок
								</Button>
							</Group>
						</Group>
					</Stack>
				) : (
					<Button onClick={() => setCollapse(true)} variant="light">
						Добавить элемент
					</Button>
				)}
			</Group>
		</form>
	);
};

export default TargetTasklist;
