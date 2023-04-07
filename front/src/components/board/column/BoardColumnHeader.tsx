import {
	ActionIcon,
	FocusTrap,
	Input,
	Text,
	UnstyledButton,
	createStyles,
} from '@mantine/core';
import { useState } from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useClickOutside } from '@mantine/hooks';

const useStyles = createStyles(theme => ({
	header: {
		display: 'flex',
		alignItems: 'center',
	},

	inputBtn: {
		padding: '0 12px',
		border: '1px solid transparent',
		flex: 1,
	},
}));

const BoardColumnHeader = () => {
	const { classes } = useStyles();
	const ref = useClickOutside(() => setCollapse(false));
	const [collapse, setCollapse] = useState(false);

	return (
		<div className={classes.header}>
			{collapse ? (
				<FocusTrap>
					<Input
						ref={ref}
						styles={{
							wrapper: { flex: 1 },
							input: { height: '32px', minHeight: '32px' },
						}}
						value="NAME"
					/>
				</FocusTrap>
			) : (
				<UnstyledButton
					onClick={() => setCollapse(true)}
					className={classes.inputBtn}
				>
					<Text size="sm">NAME</Text>
				</UnstyledButton>
			)}

			<ActionIcon h={32} w={32}>
				<FiMoreHorizontal />
			</ActionIcon>
		</div>
	);
};

export default BoardColumnHeader;
