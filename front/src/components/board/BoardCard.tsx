import { Avatar, Card, Paper, createStyles } from '@mantine/core';
import { forwardRef } from 'react';
import { FiEye } from 'react-icons/fi';
import { HiBars3BottomLeft } from 'react-icons/hi2';

const useStyles = createStyles(theme => ({
	details: {
		position: 'relative',
		padding: '6px 8px',
		overflow: 'hidden',
		'&:not(:last-child)': { marginBottom: '8px' },
	},
	labels: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '4px',
		marginBottom: '4px',
	},
	title: {
		wordWrap: 'break-word',
		display: 'block',
		margin: '0 0 4px',
		overflow: 'hidden',
		textDecoration: 'none',
	},
	footer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	badges: {
		display: 'flex',
		gap: '4px',
	},
	members: {
		display: 'flex',
		gap: '4px',
	},
}));

interface BoardCardProps extends React.HTMLAttributes<HTMLDivElement> {}

// eslint-disable-next-line react/display-name
const BoardCard = forwardRef<HTMLDivElement, BoardCardProps>((props, ref) => {
	const { classes } = useStyles();

	return (
		<Card {...props} className={classes.details} ref={ref}>
			<div className={classes.labels}></div>
			<span className={classes.title}>Объект</span>
			<div className={classes.footer}>
				<div className={classes.badges}>
					<FiEye />
					<HiBars3BottomLeft />
				</div>
				<div className={classes.members}>
					<Avatar color="cyan" size="sm" radius="xl">
						MK
					</Avatar>
				</div>
			</div>
		</Card>
	);
});

export default BoardCard;
