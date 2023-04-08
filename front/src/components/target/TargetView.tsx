import {
	Paper,
	Text,
	TextInput,
	Textarea,
	Group,
	SimpleGrid,
	createStyles,
	FocusTrap,
	UnstyledButton,
	Select,
	Checkbox,
	Grid,
	Stack,
	Button,
	FileButton,
	List,
	ActionIcon,
} from '@mantine/core';
import { FiCreditCard, FiPaperclip, FiTrash2 } from 'react-icons/fi';
import TargetSidebar from './TargetSidebar';
import { useState } from 'react';
import { useClickOutside } from '@mantine/hooks';
import Image from 'next/image';
import CustomMap from '../map/CustomMap';
import TargetTasklist from './TargetTasklist';

const useStyles = createStyles(theme => {
	const BREAKPOINT = theme.fn.smallerThan('sm');
	return {
		wrapper: {
			display: 'flex',
			backgroundColor:
				theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
			borderRadius: theme.radius.sm,
			padding: '4px',
			border: `1px solid ${
				theme.colorScheme === 'dark'
					? theme.colors.dark[5]
					: theme.colors.gray[2]
			}`,

			[BREAKPOINT]: {
				flexDirection: 'column',
			},
		},

		form: {
			boxSizing: 'border-box',
			flex: 1,
			padding: theme.spacing.xl,
			paddingLeft: theme.spacing.xl,
			borderLeft: 0,

			[BREAKPOINT]: {
				padding: theme.spacing.md,
				paddingLeft: theme.spacing.md,
			},
		},

		title: {
			display: 'flex',
			alignItems: 'center',
			gap: 16,
			marginBottom: `12px`,
			[BREAKPOINT]: {
				marginBottom: theme.spacing.md,
			},
		},

		inputBtn: {
			border: '1px solid transparent',
			minWidth: '185px',
			height: 36,
		},

		attachment: {},

		thumbnail: {},
	};
});

const data = [
	{
		value: '1',
		label: 'data 1',
	},
];

const TargetView = () => {
	const { classes } = useStyles();
	const [collapse, setCollapse] = useState(false);
	const ref = useClickOutside(() => setCollapse(false));

	const [files, setFiles] = useState<File[]>([]);

	return (
		<Paper radius="sm">
			<div className={classes.wrapper}>
				<Stack className={classes.form} spacing={36}>
					<form onSubmit={event => event.preventDefault()}>
						<div className={classes.title}>
							<FiCreditCard size={20} transform="rotate(180)" />
							{collapse ? (
								<FocusTrap>
									<TextInput
										ml={-6}
										style={{ flex: 1 }}
										styles={{
											input: {
												fontSize: '20px',
												fontWeight: 600,
												padding: '0 6px !important',
											},
										}}
										ref={ref}
										value="Объект №1"
									/>
								</FocusTrap>
							) : (
								<UnstyledButton
									onClick={() => setCollapse(true)}
									className={classes.inputBtn}
								>
									<Group>
										<Text fz={20} fw={600}>
											Объект №1
										</Text>
									</Group>
								</UnstyledButton>
							)}
						</div>

						<Grid>
							<Grid.Col sm={6} lg={4}>
								<Select
									placeholder="ЗАО"
									searchable
									data={data}
									label="Округ"
									required
								/>
							</Grid.Col>
							<Grid.Col md={6} lg={4}>
								<Select
									placeholder="Можайский"
									searchable
									data={data}
									label="Район"
									required
								/>
							</Grid.Col>
							<Grid.Col md={6} lg={4}>
								<TextInput
									label="Адрес"
									placeholder="г. Москва, ул. Беловежская, вл. 4"
									required
								/>
							</Grid.Col>
							<Grid.Col md={6} lg={6}>
								<Select
									label="Тип объекта"
									placeholder="прочее"
									data={data}
									required
								/>
							</Grid.Col>
							<Grid.Col md={6} lg={6}>
								<Select
									label="Состояние объекта"
									placeholder="Обладает признаками СС"
									data={data}
									required
								/>
							</Grid.Col>
							<Grid.Col md={6} lg={6}>
								<Select label="Собственник" data={data} required />
							</Grid.Col>
							<Grid.Col md={6} lg={6}>
								<Select label="Фактический пользователь" data={data} required />
							</Grid.Col>
						</Grid>
					</form>

					{/* <CustomMap /> */}

					{files.length > 0 && (
						<form>
							<div className={classes.title}>
								<FiPaperclip size={20} />
								<Group>
									<Text fw={600}>Вложения</Text>
								</Group>
							</div>

							<Stack mt={5}>
								{files.map((file, index) => (
									<div key={index}>
										<Group align="top">
											{file.type.startsWith('image/') ? (
												<Image
													src={URL.createObjectURL(file)}
													alt={file.name}
													width={112}
													height={80}
												/>
											) : (
												<Paper
													w={112}
													h={80}
													style={{
														display: 'flex',
														justifyContent: 'center',
														alignItems: 'center',
													}}
													withBorder
												>
													<Text tt="uppercase" size="xl" fw={500}>
														{file.name.split('.').pop()}
													</Text>
												</Paper>
											)}

											<div>
												<Text>{file.name}</Text>
												<Group spacing={8}>
													<Text size="xs" underline>
														Удалить
													</Text>

													{file.type.startsWith('image/') && (
														<>
															<Text>•</Text>
															<Text size="xs" underline>
																Сделать обложкой
															</Text>
														</>
													)}
												</Group>
											</div>
										</Group>
									</div>
								))}
							</Stack>

							<Group mt={24}>
								<FileButton onChange={setFiles} multiple>
									{props => (
										<Button variant="light" {...props}>
											Добавить вложение
										</Button>
									)}
								</FileButton>
							</Group>
						</form>
					)}

					<TargetTasklist />
				</Stack>
				<TargetSidebar />
			</div>
		</Paper>
	);
};

export default TargetView;
