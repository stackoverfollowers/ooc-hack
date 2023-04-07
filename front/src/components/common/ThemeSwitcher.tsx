import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeSwitcher = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<ActionIcon variant="default" onClick={() => toggleColorScheme()} size={30}>
			{colorScheme === 'dark' ? <FiSun size="16" /> : <FiMoon size="16" />}
		</ActionIcon>
	);
};

export default ThemeSwitcher;
