import { Text, Button, createStyles, Stack, FileButton } from '@mantine/core';
import {
	FiCheckSquare,
	FiClock,
	FiLayers,
	FiMapPin,
	FiPaperclip,
	FiTag,
} from 'react-icons/fi';
import TargetAddMembers from './TargetAddMember';
import TargetAddCustomFields from '@/components/target/TargetAddCustomFields';
import TargetAddDate from '@/components/target/TargetAddDate';
import TargetAddLocation from '@/components/target/TargetAddLocation';

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
				<TargetAddMembers />

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
					Задачи
				</Button>
				<TargetAddDate />
				<TargetAddLocation />

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
				<TargetAddCustomFields />
			</Stack>
		</div>
	);
};

export default TargetSidebar;
