import {
	Button,
	Center,
	CloseButton,
	createStyles,
	Divider,
	Popover,
	Stack,
	Text,
} from '@mantine/core';
import { useState } from 'react';
import CustomMap, { Position } from '@/components/map/CustomMap';
import { FiMapPin } from 'react-icons/fi';

const useStyles = createStyles(theme => ({
	stack: {
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		boxSizing: 'border-box',
	},
	close: {
		position: 'absolute',
		right: 14,
		top: 14,
	},
}));

export default function TargetAddLocation() {
	const { classes } = useStyles();
	const [opened, setOpened] = useState(false);
	const [currentPosition, setCurrentPosition] = useState<Position>();

	return (
		<Popover
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
					leftIcon={<FiMapPin />}
					styles={{ inner: { justifyContent: 'flex-start' } }}
					onClick={() => setOpened(o => !o)}
				>
					Адрес
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
					<Text>Выбор адреса</Text>
				</Center>
				<CloseButton
					className={classes.close}
					onClick={() => setOpened(false)}
				/>

				<Divider my={8} />
				<Stack className={classes.stack}>
					<CustomMap
						position={currentPosition}
						setPosition={setCurrentPosition}
					/>
				</Stack>
			</Popover.Dropdown>
		</Popover>
	);
}
