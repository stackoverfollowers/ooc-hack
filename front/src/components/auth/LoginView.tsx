import Link from 'next/link';
import {
	TextInput,
	PasswordInput,
	Text,
	Group,
	Button,
	Stack,
} from '@mantine/core';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/router';
import { useLoginMutation } from '@/redux/services/auth';
import { useState } from 'react';

const schema = z.object({
	username: z.string().min(2, {
		message: 'Имя пользователя должно состоять как минимум из 2 символов',
	}),
	password: z
		.string()
		.min(4, { message: 'Пароль должен состоять как минимум из 4 символов' }),
});

const LoginView = () => {
	const router = useRouter();

	const [login, { isLoading }] = useLoginMutation();

	const [error, setError] = useState('');

	const form = useForm({
		initialValues: { username: '', password: '' },
		validate: zodResolver(schema),
	});

	const handleSubmit = async (values: typeof form.values) => {
		try {
			await login(values);
			router.replace('/');
		} catch (error) {
			console.log(error);
			setError('Что-то пошло не так');
		}
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack>
				<TextInput
					required
					placeholder="Имя пользователя"
					{...form.getInputProps('username')}
				/>

				<PasswordInput
					required
					placeholder="Пароль"
					{...form.getInputProps('password')}
				/>
			</Stack>

			<Stack mt="xl" align="center">
				<Button w="100%" type="submit" loading={isLoading}>
					Войти
				</Button>

				<Group spacing={5}>
					<Text color="dimmed" size="sm">
						У вас ещё нет аккаунт?
					</Text>
					<Text
						component={Link}
						href="/register"
						color="blue"
						size="sm"
						fw={500}
					>
						Зарегистрироваться
					</Text>
				</Group>
			</Stack>
		</form>
	);
};

export default LoginView;
