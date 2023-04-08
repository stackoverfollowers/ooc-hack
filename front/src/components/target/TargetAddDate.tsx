import {
	Button,
	Center,
	Checkbox,
	CloseButton,
	createStyles,
	Divider,
	Popover,
	Stack,
	Text,
} from '@mantine/core';
import { FiClock } from 'react-icons/fi';
import { useState } from 'react';
import { DateTimePicker } from '@mantine/dates';

const useStyles = createStyles(theme => ({
	datePicker: {
		label: {
			color:
				theme.colorScheme === 'dark'
					? theme.colors.dark[0]
					: theme.colors.gray[9],
		},
	},

	close: {
		position: 'absolute',
		right: 14,
		top: 14,
	},
}));

export default function TargetAddDate() {
	const { classes, theme } = useStyles();
	const [opened, setOpened] = useState(false);
	const [isStartDateNeeded, setIsStartDateNeeded] = useState<boolean>();
	const [isTimeLengthNeeded, setIsTimeLengthNeeded] = useState<boolean>();

	const [startDate, setStartDate] = useState<Date | null>();
	const [timeLength, setTimeLength] = useState<Date | null>();

	const handleAddDatePeriod = (startDate: any, timeLength: any) => {
		//TODO send to back here
	};

	const handleReset = () => {
		setStartDate(null);
		setTimeLength(null);
		//TODO send to back here
	};

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
					leftIcon={<FiClock />}
					styles={{ inner: { justifyContent: 'flex-start' } }}
					onClick={() => setOpened(o => !o)}
				>
					Даты
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
					<Text>Даты</Text>
				</Center>
				<CloseButton
					className={classes.close}
					onClick={() => setOpened(false)}
				/>

				<Divider my={8} />
				<Stack spacing={10}>
					<Checkbox
						label="Дата начала"
						checked={isStartDateNeeded}
						onChange={e => setIsStartDateNeeded(e.currentTarget.checked)}
					/>
					<Checkbox
						label="Срок"
						checked={isTimeLengthNeeded}
						onChange={e => setIsTimeLengthNeeded(e.currentTarget.checked)}
					/>
					<DateTimePicker
						className={classes.datePicker}
						disabled={!isStartDateNeeded}
						label="Выберите дату начала"
						placeholder="Дата..."
						value={startDate}
						onChange={setStartDate}
						styles={{
							label: {
								color:
									theme.colorScheme !== 'dark'
										? theme.colors.dark[0]
										: theme.colors.gray[1],
							},
						}}
					/>
					<DateTimePicker
						className={classes.datePicker}
						disabled={!isTimeLengthNeeded}
						label="Выберите срок"
						placeholder="Дата..."
						value={timeLength}
						onChange={setTimeLength}
						styles={{
							label: {
								color:
									theme.colorScheme !== 'dark'
										? theme.colors.dark[0]
										: theme.colors.gray[1],
							},
						}}
					/>
					<Button onClick={() => handleAddDatePeriod(startDate, timeLength)}>
						Сохранить
					</Button>
					<Button variant="outline" onClick={handleReset}>
						Удалить
					</Button>
				</Stack>
			</Popover.Dropdown>
		</Popover>
	);
}
