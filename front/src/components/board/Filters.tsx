import {
	Button,
	Checkbox,
	Popover,
	Stack,
	Text,
	UnstyledButton,
	createStyles,
} from '@mantine/core';
import { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const useStyles = createStyles(theme => ({
	container: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
	},

	navigation: { [theme.fn.smallerThan('sm')]: { display: 'none' } },

	burger: { [theme.fn.largerThan('sm')]: { display: 'none' } },

	moreDateOptions: {
		display: 'flex',
		alignItems: 'center',
		marginLeft: 32,
		marginTop: 4,
		gap: '4px',
		'&:hover': {
			textDecoration: 'underline',
		},
	},

	labelGroup: { display: 'flex', gap: 12 },

	label: {
		width: '100%',
		height: '20px',
		borderRadius: '4px',
	},
	greenLabel: { backgroundColor: theme.colors.green[5], opacity: 0.8 },
	yellowLabel: { backgroundColor: theme.colors.yellow[5], opacity: 0.8 },
	orangeLabel: { backgroundColor: theme.colors.orange[5], opacity: 0.8 },
	redLabel: { backgroundColor: theme.colors.red[5], opacity: 0.8 },
}));

const Filters = () => {
	const [showMoreDates, setShowMoreDates] = useState(false);
	const { classes, cx } = useStyles();

	const handlePopoverClose = () => {
		setShowMoreDates(false);
	};

	return (
		<Popover
			width={384}
			position="bottom"
			shadow="md"
			onClose={handlePopoverClose}
		>
			<Popover.Target>
				<Button h={32}>Фильтр</Button>
			</Popover.Target>
			<Popover.Dropdown>
				<Stack spacing="xl">
					<div>
						<Text size="sm" mb="xs">
							Участники
						</Text>

						{/* ?filter=member:none,member:makolabruzzo */}
						<Stack spacing={8} ml="xs">
							<Checkbox label="Нет участников" />
							<Checkbox label="Карточки, назначенные мне" />
						</Stack>
					</div>

					<div>
						<Text size="sm" mb="xs">
							Срок
						</Text>

						{/* ?filter=member:none,member:makolabruzzo */}
						<Stack spacing={8} ml="xs">
							{/* ?filter=notDue:true */}
							<Checkbox label="Без даты" />
							{/* ?filter=overdue:true */}
							<Checkbox label="Просроченные" />
							{/* ?filter=due:day */}
							<Checkbox label="Срок истекает в течение суток" />
							{showMoreDates ? (
								<>
									{/* ?filter=due:week */}
									<Checkbox label="Срок истекает в течение недели" />
									{/* ?filter=due:month */}
									<Checkbox label="Срок истекает в течение месяца" />
									{/* ?filter=dueComplete:true */}
									<Checkbox label="Отмечено как выполненное" />
									{/* ?filter=dueComplete:false */}
									<Checkbox label="Не отмечено как выполненное" />
								</>
							) : (
								<UnstyledButton
									onClick={() => setShowMoreDates(true)}
									className={classes.moreDateOptions}
								>
									<Text size="sm" color="dimmed">
										Показать все параметры
									</Text>
									<FiChevronDown size={16} />
								</UnstyledButton>
							)}
						</Stack>
					</div>

					<div>
						<Text size="sm" mb="xs">
							Метки
						</Text>

						{/* ?filter=member:none,member:makolabruzzo */}
						<Stack spacing={8} ml="xs">
							<Checkbox label="Нет меток" />
							<div className={classes.labelGroup}>
								<Checkbox />
								<div className={cx(classes.label, classes.greenLabel)} />
							</div>

							<div className={classes.labelGroup}>
								<Checkbox />
								<div className={cx(classes.label, classes.yellowLabel)} />
							</div>

							<div className={classes.labelGroup}>
								<Checkbox />
								<div className={cx(classes.label, classes.orangeLabel)} />
							</div>

							<div className={classes.labelGroup}>
								<Checkbox />
								<div className={cx(classes.label, classes.redLabel)} />
							</div>
						</Stack>
					</div>
				</Stack>
			</Popover.Dropdown>
		</Popover>
	);
};

export default Filters;
