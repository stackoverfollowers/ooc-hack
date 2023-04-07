import {
	Button,
	FocusTrap,
	Group,
	Textarea,
	createStyles,
} from '@mantine/core';
import { FiPlus, FiX } from 'react-icons/fi';
import { FormEvent, useState } from 'react';
import { useClickOutside } from '@mantine/hooks';

const useStyles = createStyles(theme => ({
	wrapper: {
		boxSizing: 'border-box',
		display: 'inline-block',
		height: '100%',
		verticalAlign: 'top',
		whiteSpace: 'nowrap',
		minWidth: '272px',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		maxHeight: '100%',
		position: 'relative',
		whiteSpace: 'normal',
		width: '100% !important',
	},

	input: { height: '32px', minHeight: '32px' },

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

const BoardColumnFooter = () => {
	const { classes } = useStyles();
	const [collapse, setCollapse] = useState(false);
	const ref = useClickOutside(() => setCollapse(false));

	const handleBoardCardAdd = (e: FormEvent<HTMLFormElement>) => {};

	return (
		<>
			{collapse ? (
				<form ref={ref} className={classes.form} onSubmit={handleBoardCardAdd}>
					<FocusTrap>
						<Textarea placeholder="Ввести заголовок для этой карточки" />
					</FocusTrap>
					<Group mt={8} spacing={0}>
						<Button type="submit" h={32} mr={8}>
							Добавить карточку
						</Button>
						<FiX
							onClick={() => setCollapse(false)}
							className={classes.closeIcon}
						/>
					</Group>
				</form>
			) : (
				<Button
					onClick={() => setCollapse(true)}
					variant="subtle"
					leftIcon={<FiPlus size={16} />}
					size="xs"
					styles={{ inner: { justifyContent: 'flex-start' } }}
				>
					Добавить карточку
				</Button>
			)}
		</>
	);
};

export default BoardColumnFooter;
