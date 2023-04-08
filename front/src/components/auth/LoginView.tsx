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
	email: z.coerce.string().email().min(5, { message: 'Invalid email' }),
	password: z
		.string()
		.min(4, { message: 'Пароль должен состоять как минимум из 4 символов' }),
});

const LoginView = () => {
	const router = useRouter();

	const [login, { isLoading }] = useLoginMutation();

	const [error, setError] = useState('');

	const form = useForm({
		initialValues: { email: '', password: '' },
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
					placeholder="Почта"
					type="email"
					{...form.getInputProps('email')}
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
