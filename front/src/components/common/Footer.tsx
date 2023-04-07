import { createStyles, Container, Group, ActionIcon } from '@mantine/core';
import { FiGithub, FiLink } from 'react-icons/fi';
import Logo from '../ui/Logo';
import Link from 'next/link';

const useStyles = createStyles(theme => ({
	footer: {
		height: 60,
		borderTop: `1px solid ${
			theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
		}`,
	},

	inner: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '100%',
	},
}));

const Footer = () => {
	const { classes } = useStyles();

	return (
		<div className={classes.footer}>
			<Container className={classes.inner}>
				<Logo />
				<Group spacing={0} position="right" noWrap>
					<ActionIcon
						component={Link}
						href="https://github.com/stackoverfollowers"
						size="lg"
						target="__blank"
					>
						<FiGithub />
					</ActionIcon>
				</Group>
			</Container>
		</div>
	);
};

export default Footer;
