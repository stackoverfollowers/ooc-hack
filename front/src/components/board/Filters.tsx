import React, { ReactNode } from 'react';
import { Avatar, CheckboxProps, ThemeIcon } from '@mantine/core';
import {
	Checkbox,
	Stack,
	Text,
	UnstyledButton,
	createStyles,
} from '@mantine/core';
import { useState } from 'react';
import { FiChevronDown, FiClock, FiUser } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setBoardFilters } from '@/redux/slices/boardSlice';

const useStyles = createStyles(theme => ({
	moreOptions: {
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

	checkboxLabel: {
		display: 'flex',
		alignItems: 'center',
		gap: '4px',
	},

	coloredLabel: {
		width: '257px',
		height: '20px',
		borderRadius: '4px',
		opacity: 0.8,
	},

	checkboxWrapper: {
		display: 'flex',
		alignItems: 'center',
		padding: '8px',
		height: '38px',
	},
}));

interface FilterCheckboxProps extends CheckboxProps {
	children: ReactNode;
}

const FilterCheckbox = ({ children, ...rest }: FilterCheckboxProps) => {
	const { classes } = useStyles();
	return (
		<div className={classes.checkboxWrapper}>
			<Checkbox
				{...rest}
				styles={{ body: { alignItems: 'center' } }}
				label={<div className={classes.checkboxLabel}>{children}</div>}
			/>
		</div>
	);
};

const Filters = () => {
	const { classes, cx, theme } = useStyles();
	const [showMoreDates, setShowMoreDates] = useState(false);

	const dispatch = useAppDispatch();
	const filters = useAppSelector(state => state.board.filters);

	const labels = Object.keys(theme.colors)
		.slice(8, 14)
		.map(color => (
			<div key={color} className={classes.labelGroup}>
				<Checkbox
					label={
						<div
							className={classes.coloredLabel}
							style={{
								backgroundColor: theme.colors[color][5],
							}}
						/>
					}
				/>
			</div>
		));

	return (
		<Stack spacing="xl">
			{/* ?filter=member:none,member:makolabruzzo */}
			<Stack spacing={0}>
				<Text size="sm" mb="xs">
					Участники
				</Text>

				<FilterCheckbox
					checked={filters.noMembers}
					onChange={({ target }) =>
						dispatch(setBoardFilters({ ...filters, noMembers: target.checked }))
					}
				>
					<ThemeIcon color="gray" size={24} radius="xl">
						<FiUser size={16} />
					</ThemeIcon>
					<Text size="sm">Нет участников</Text>
				</FilterCheckbox>

				<FilterCheckbox
					checked={filters.me}
					onChange={({ target }) =>
						dispatch(setBoardFilters({ ...filters, me: target.checked }))
					}
				>
					<Avatar variant="filled" color="blue" size={24} radius="xl">
						MK
					</Avatar>
					<Text size="sm">Объекты, назначенные мне</Text>
				</FilterCheckbox>
			</Stack>

			{/* ?filter=member:none,member:makolabruzzo */}
			<Stack spacing={0}>
				<Text size="sm" mb="xs">
					Срок
				</Text>

				<FilterCheckbox
					checked={filters.notDue}
					onChange={({ target }) =>
						dispatch(setBoardFilters({ ...filters, notDue: target.checked }))
					}
				>
					{/* ?filter=notDue:true */}
					<ThemeIcon color="gray" size={24} radius="xl">
						<FiClock size={16} />
					</ThemeIcon>
					<Text size="sm">Без даты</Text>
				</FilterCheckbox>

				<FilterCheckbox
					checked={filters.overdue}
					onChange={({ target }) =>
						dispatch(setBoardFilters({ ...filters, overdue: target.checked }))
					}
				>
					{/* ?filter=overdue:true */}
					<ThemeIcon color="red" size={24} radius="xl">
						<FiClock size={16} />
					</ThemeIcon>
					<Text size="sm">Просроченные</Text>
				</FilterCheckbox>

				<FilterCheckbox
					checked={filters.due === 'day'}
					onChange={() =>
						dispatch(
							setBoardFilters({
								...filters,
								due: filters.due === 'day' ? null : 'day',
							})
						)
					}
				>
					{/* ?filter=due:day */}
					<ThemeIcon color="orange" size={24} radius="xl">
						<FiClock size={16} />
					</ThemeIcon>
					<Text size="sm">Срок истекает в течение суток</Text>
				</FilterCheckbox>

				{showMoreDates ? (
					<>
						<FilterCheckbox
							checked={filters.due === 'week'}
							onChange={() =>
								dispatch(
									setBoardFilters({
										...filters,
										due: filters.due === 'week' ? null : 'week',
									})
								)
							}
						>
							{' '}
							{/* ?filter=due:week */}
							<ThemeIcon color="gray" size={24} radius="xl">
								<FiClock size={16} />
							</ThemeIcon>
							<Text size="sm">Срок истекает в течение недели</Text>
						</FilterCheckbox>

						<FilterCheckbox
							checked={filters.due === 'month'}
							onChange={() =>
								dispatch(
									setBoardFilters({
										...filters,
										due: filters.due === 'month' ? null : 'month',
									})
								)
							}
						>
							{/* ?filter=due:month */}
							<ThemeIcon color="gray" size={24} radius="xl">
								<FiClock size={16} />
							</ThemeIcon>
							<Text size="sm">Срок истекает в течение месяца</Text>
						</FilterCheckbox>

						<FilterCheckbox
							checked={filters.dueComplete === true}
							onChange={() =>
								dispatch(
									setBoardFilters({
										...filters,
										dueComplete: filters.dueComplete === true ? null : true,
									})
								)
							}
						>
							{/* ?filter=dueComplete:true */}
							<Text size="sm">Отмечено как выполненное</Text>
						</FilterCheckbox>

						<FilterCheckbox
							checked={filters.dueComplete === false}
							onChange={() =>
								dispatch(
									setBoardFilters({
										...filters,
										dueComplete: filters.dueComplete === false ? null : false,
									})
								)
							}
						>
							{/* ?filter=dueComplete:false */}
							<Text size="sm">Не отмечено как выполненное</Text>
						</FilterCheckbox>
					</>
				) : (
					<UnstyledButton
						onClick={() => setShowMoreDates(true)}
						className={classes.moreOptions}
					>
						<Text size="sm" color="dimmed">
							Показать все параметры
						</Text>
						<FiChevronDown size={16} />
					</UnstyledButton>
				)}
			</Stack>

			{/* ?filter=member:none,member:makolabruzzo */}
			<Stack spacing={8} ml="xs">
				<Text size="sm" mb="xs">
					Метки
				</Text>
				<Checkbox label="Нет меток" />

				{labels}
			</Stack>
		</Stack>
	);
};

export default Filters;
