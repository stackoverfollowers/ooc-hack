import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLabelsExpanded } from '@/redux/slices/boardSlice';
import {
	ActionIcon,
	Avatar,
	Badge,
	Card,
	Center,
	ColorSwatch,
	Group,
	Paper,
	Progress,
	Stack,
	Text,
	Tooltip,
	createStyles,
	useMantineTheme,
} from '@mantine/core';
import Image from 'next/image';
import { forwardRef } from 'react';
import { FiEye, FiPaperclip } from 'react-icons/fi';
import { HiBars3BottomLeft } from 'react-icons/hi2';

const useStyles = createStyles(theme => ({
	labels: {
		display: 'flex',
		flexWrap: 'wrap',
		gap: '4px',
	},

	badge: {
		cursor: 'pointer',
	},

	card: {
		backgroundColor:
			theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
	},

	imageSection: {
		position: 'relative',
		overflow: 'hidden',
		height: '130px',
	},

	image: { objectFit: 'cover' },

	rating: {
		position: 'absolute',
		top: theme.spacing.xs,
		right: 12,
		pointerEvents: 'none',
	},

	action: {
		backgroundColor:
			theme.colorScheme === 'dark'
				? theme.colors.dark[6]
				: theme.colors.gray[0],
		...theme.fn.hover({
			backgroundColor:
				theme.colorScheme === 'dark'
					? theme.colors.dark[5]
					: theme.colors.gray[1],
		}),
	},

	footer: {},
}));

interface BoardCardProps extends React.HTMLAttributes<HTMLDivElement> {}

// eslint-disable-next-line react/display-name
const BoardCard = forwardRef<HTMLDivElement, BoardCardProps>((props, ref) => {
	const { classes, cx } = useStyles();

	const dispatch = useAppDispatch();

	const boardTheme = useAppSelector(state => state.board.theme);

	const theme = useMantineTheme();
	const swatches = Object.keys(theme.colors)
		.slice(8, 14)
		.map(color => (
			<ColorSwatch
				key={color}
				color={theme.colors[color][6]}
				className={classes.badge}
				styles={{
					overlay: { '&:hover': { backgroundColor: theme.colors[color][9] } },
				}}
				onClick={() => dispatch(setLabelsExpanded())}
				radius="xs"
				h={boardTheme.labelsExpanded ? 16 : 8}
				w={boardTheme.labelsExpanded ? 56 : 40}
			/>
		));

	return (
		<Card withBorder radius="md" className={cx(classes.card)} {...props} p={0}>
			<div className={classes.imageSection}>
				<a href="#">
					<Image
						className={classes.image}
						src="/background.jpg"
						alt="cover"
						fill
					/>
				</a>
			</div>
			<Badge
				className={classes.rating}
				variant="gradient"
				gradient={{ from: 'yellow', to: 'red' }}
			>
				BADGE
			</Badge>

			<Stack p="xs">
				<div className={classes.labels}>{swatches}</div>

				<div>
					<Group position="apart">
						<Text fw={500} component="a" href="#">
							Объект 1
						</Text>
						<Badge size="sm">BADGE</Badge>
					</Group>
				</div>

				{/* <div>
					<Text c="dimmed" fz="sm">
						Задач выполнено:{' '}
						<Text
							span
							fw={500}
							sx={theme => ({
								color: theme.colorScheme === 'dark' ? theme.white : theme.black,
							})}
						>
							23/36
						</Text>
					</Text>

					<Progress value={(23 / 36) * 100} mt={5} />
				</div> */}

				<Text fz="sm" color="dimmed" lineClamp={4}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</Text>

				<Group position="apart" className={classes.footer}>
					<Group spacing={8} mr={0}>
						<ActionIcon className={classes.action}>
							<FiEye size={16} />
						</ActionIcon>
						<ActionIcon className={classes.action}>
							<HiBars3BottomLeft size={16} />
						</ActionIcon>
						<ActionIcon className={classes.action}>
							<FiPaperclip size={16} />
						</ActionIcon>
					</Group>

					<Center>
						<Tooltip.Group openDelay={300} closeDelay={100}>
							<Avatar.Group spacing="xs">
								<Tooltip label="Salazar Troop" withArrow>
									<Avatar color="green" size={32} radius="xl">
										MK
									</Avatar>
								</Tooltip>
								<Tooltip label="Bandit Crimes" withArrow>
									<Avatar color="yellow" size={32} radius="xl">
										MK
									</Avatar>
								</Tooltip>
								<Tooltip label="Jane Rata" withArrow>
									<Avatar color="red" size={32} radius="xl">
										MK
									</Avatar>
								</Tooltip>
								<Tooltip
									withArrow
									label={
										<>
											<div>John Outcast</div>
											<div>Levi Capitan</div>
										</>
									}
								>
									<Avatar color="blue" radius="xl" size={32}>
										+2
									</Avatar>
								</Tooltip>
							</Avatar.Group>
						</Tooltip.Group>
					</Center>
				</Group>
			</Stack>
		</Card>
	);
});

export default BoardCard;
