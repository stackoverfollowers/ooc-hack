import {
	Button,
	Grid,
	Input,
	SegmentedControl,
	Stack,
	createStyles,
} from '@mantine/core';
import BoardCard from './BoardCard';
import { FiGrid, FiList, FiSearch } from 'react-icons/fi';
import { useState } from 'react';

const useStyles = createStyles(theme => ({
	board: {
		display: 'flex',
		gap: '8px',
	},

	burger: { [theme.fn.largerThan('sm')]: { display: 'none' } },

	root: {
		display: 'flex',
		alignItems: 'stretch',
		gap: '8px',
	},

	input: { flex: 1 },

	segments: {
		border: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
		}`,
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[9]
				: theme.colors.gray[2],
	},

	segment: {
		height: '16px',
		width: '16px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

const Board = () => {
	const { classes } = useStyles();
	const [value, setValue] = useState('grid');

	const options = [
		{
			value: 'grid',
			label: (
				<div className={classes.segment}>
					<FiGrid size="16" />
				</div>
			),
		},
		{
			value: 'list',
			label: (
				<div className={classes.segment}>
					<FiList size="16" />
				</div>
			),
		},
	];

	return (
		<Stack>
			<div className={classes.root}>
				<Input
					id="search"
					className={classes.input}
					icon={<FiSearch size="16" />}
					placeholder="Поиск объектов"
				/>
				<SegmentedControl
					className={classes.segments}
					value={value}
					onChange={value => setValue(value)}
					data={options}
				/>

				<Button>Добавить объект</Button>
			</div>
			{value === 'grid' ? (
				<Grid>
					{[...Array(6)].map((_, i) => (
						<Grid.Col key={i} sm={6} md={3} lg={3}>
							<BoardCard />
						</Grid.Col>
					))}
				</Grid>
			) : (
				<Stack spacing={0}>
					{[...Array(9)].map((_, i) => (
						<BoardCard key={i} />
					))}
				</Stack>
			)}
		</Stack>
	);
};

export default Board;
