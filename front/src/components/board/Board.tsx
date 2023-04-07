import {
	Button,
	Card,
	FocusTrap,
	Group,
	TextInput,
	createStyles,
} from '@mantine/core';
import BoardColumn from './column/BoardColumn';
import { useClickOutside } from '@mantine/hooks';
import { FormEvent, useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import BoardColumnAdd from './column/BoardColumnAdd';

const useStyles = createStyles(theme => ({
	root: {
		position: 'relative',
		flexGrow: 1,
	},

	board: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		overflowX: 'auto',
		overflowY: 'hidden',
		paddingBottom: '8px',
		position: 'absolute',
		userSelect: 'none',
		whiteSpace: 'nowrap',
		display: 'flex',
		gap: '8px',
	},

	burger: { [theme.fn.largerThan('sm')]: { display: 'none' } },
}));

const Board = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.board}>
				{[...Array(2)].map((_, i) => (
					<BoardColumn key={i} />
				))}
				<BoardColumnAdd />
			</div>
		</div>
	);
};

export default Board;
