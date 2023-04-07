import {
	Button,
	Card,
	FocusTrap,
	Group,
	TextInput,
	createStyles,
} from '@mantine/core';
import { FiPlus, FiX } from 'react-icons/fi';
import { useState } from 'react';
import { useClickOutside } from '@mantine/hooks';

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
	cardInput: { height: '32px', minHeight: '32px' },

	closeIcon: {
		height: '24px',
		width: '24px',
		cursor: 'pointer',
		color:
			theme.colorScheme === 'dark'
				? theme.colors.dark[0]
				: theme.colors.gray[7],
		'&:hover': {
			color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.black,
		},
	},
}));

const BoardColumnAdd = () => {
	const { classes } = useStyles();
	const [collapse, setCollapse] = useState(false);
	const ref = useClickOutside(() => setCollapse(false));

	return (
		<div className={classes.root}>
			{collapse ? (
				<Card ref={ref} component="form" className={classes.card}>
					<FocusTrap>
						<TextInput
							classNames={{ input: classes.cardInput }}
							placeholder="Ввести заголовок списка"
						/>
					</FocusTrap>
					<Group mt={8} spacing={0}>
						<Button h={32} mr={8}>
							Добавить список
						</Button>
						<FiX
							onClick={() => setCollapse(false)}
							className={classes.closeIcon}
						/>
					</Group>
				</Card>
			) : (
				<Button
					onClick={() => setCollapse(true)}
					variant="light"
					leftIcon={<FiPlus size={16} />}
				>
					Добавить еще одну колонку
				</Button>
			)}
		</div>
	);
};

export default BoardColumnAdd;
