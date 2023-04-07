import {
	FocusTrap,
	Group,
	Text,
	TextInput,
	UnstyledButton,
	createStyles,
} from '@mantine/core';
import { useState } from 'react';
import { useClickOutside } from '@mantine/hooks';

const useStyles = createStyles(theme => ({
	inputBtn: {
		padding: '0 12px',
		border: '1px solid transparent',
		minWidth: '185px',
		height: '32px',
	},
	input: { height: '32px', minHeight: '32px' },
}));

const BoardHeader = () => {
	const { classes } = useStyles();
	const [collapse, setCollapse] = useState(false);
	const ref = useClickOutside(() => setCollapse(false));

	return (
		<Group position="apart">
			{collapse ? (
				<FocusTrap>
					<TextInput
						ref={ref}
						classNames={{ input: classes.input }}
						value="РЕЕСТР №1"
					/>
				</FocusTrap>
			) : (
				<UnstyledButton
					onClick={() => setCollapse(true)}
					className={classes.inputBtn}
				>
					<Text size="sm" fw={500}>
						РЕЕСТР №1
					</Text>
				</UnstyledButton>
			)}
		</Group>
	);
};

export default BoardHeader;
