import { Card, Stack, createStyles } from '@mantine/core';
import BoardColumnHeader from './BoardColumnHeader';
import BoardColumnFooter from './BoardColumnFooter';
import BoardColumnBody from './BoardColumnBody';

const useStyles = createStyles(theme => ({
	root: {
		boxSizing: 'border-box',
		display: 'inline-block',
		height: '100%',
		verticalAlign: 'top',
		whiteSpace: 'nowrap',
		minWidth: '272px',
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
		maxHeight: '100%',
		position: 'relative',
		whiteSpace: 'normal',
		padding: '8px !important',
	},
	column: { gap: '8px !important' },
}));

const BoardColumn = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.root}>
			<Card className={classes.card}>
				<Stack className={classes.column}>
					<BoardColumnHeader />
					<BoardColumnBody />
					<BoardColumnFooter />
				</Stack>
			</Card>
		</div>
	);
};

export default BoardColumn;
