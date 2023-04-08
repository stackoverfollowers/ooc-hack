import { Text, Button, createStyles, Stack, FileButton } from '@mantine/core';
import {
	FiCheckSquare,
	FiClock,
	FiLayers,
	FiPaperclip,
	FiTag,
	FiUser,
} from 'react-icons/fi';

const useStyles = createStyles(theme => {
	const BREAKPOINT = theme.fn.smallerThan('sm');

	return {
		sidebar: {
			boxSizing: 'border-box',
			position: 'relative',
			padding: theme.spacing.xl,
			flex: `0 0 280px`,

			[BREAKPOINT]: {
				marginBottom: theme.spacing.sm,
				paddingLeft: theme.spacing.md,
			},
		},
	};
});

const TargetSidebar = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.sidebar}>
			<Text size="sm" fw={700} mb={10}>
				Добавить в объект
			</Text>
			<Stack>
				<Button
					variant="light"
					color="gray"
					leftIcon={<FiUser />}
					styles={{ inner: { justifyContent: 'flex-start' } }}
				>
					Участники
				</Button>
				<Button
					variant="light"
					color="gray"
					leftIcon={<FiTag />}
					styles={{ inner: { justifyContent: 'flex-start' } }}
				>
					Метки
				</Button>
				<Button
					variant="light"
					color="gray"
					leftIcon={<FiCheckSquare />}
					styles={{ inner: { justifyContent: 'flex-start' } }}
				>
					Чек-лист
				</Button>
				<Button
					variant="light"
					color="gray"
					leftIcon={<FiClock />}
					styles={{ inner: { justifyContent: 'flex-start' } }}
				>
					Даты
				</Button>

				<FileButton onChange={() => {}} multiple>
					{props => (
						<Button
							variant="light"
							color="gray"
							leftIcon={<FiPaperclip />}
							styles={{ inner: { justifyContent: 'flex-start' } }}
							{...props}
						>
							Вложение
						</Button>
					)}
				</FileButton>
				<Button
					variant="light"
					color="gray"
					leftIcon={<FiLayers />}
					styles={{ inner: { justifyContent: 'flex-start' } }}
				>
					Поля пользователя
				</Button>
			</Stack>
		</div>
	);
};

export default TargetSidebar;
