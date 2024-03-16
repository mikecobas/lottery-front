import React, { useState } from 'react';
import { Button, Card, Center, PasswordInput, TextInput, Title } from '@mantine/core';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        try {
            await login(email, password);
            router.push('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Center>
            <Card w={400}>
                <Center>
                    <Title order={1} pb={30}>Sorteos</Title>
                </Center>
                <form onSubmit={handleSubmit}>
                    <TextInput label="Correo" pb={10} value={email} onChange={(event) => setEmail(event.currentTarget.value)} />
                    <PasswordInput label="Contraseña" pb={30} value={password} onChange={(event) => setPassword(event.currentTarget.value)} />
                    <Button type="submit">Iniciar sesión</Button>
                </form>
            </Card>
        </Center>
    );
};

export default Login;