import React, { useState, useContext } from 'react';
import { Button, Card, Center, PasswordInput, TextInput, Title } from '@mantine/core';
import { useAuth } from '@/hooks/useAuth';
import { AuthContext } from '@/contexts/AuthContext';



const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authState, login] = useAuth();
    const { dispatch } = useContext(AuthContext);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        await login(email, password);
        if (!authState.error) {
            dispatch({ type: 'LOGIN', payload: { email, token: localStorage.getItem('token') } });
        }
    };

    return (
        <>
            <Center>
                <Card w={400}>
                    <Center>
                        <Title order={1} pb={30}>Sorteos</Title>
                    </Center>
                    <form onSubmit={handleSubmit}>
                        <TextInput label="Correo" pb={10} value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
                        <PasswordInput label="Contraseña" pb={30} value={password} onChange={(e) => setPassword(e.currentTarget.value)} />
                        <Button type="submit">Iniciar sesión</Button>
                    </form>
                </Card>
            </Center>
        </>
    );
};

export default Login;