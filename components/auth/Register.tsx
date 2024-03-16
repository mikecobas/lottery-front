import React from 'react'
import { Button, Card, Center, PasswordInput, TextInput, Title } from '@mantine/core'

const Register = () => {
    return (
        <Center>
            <Card w={400}>
                <Center>
                    <Title order={1} pb={30}>Sorteos</Title>
                </Center>
                <TextInput label="Correo" pb={10} />
                <PasswordInput label="Contraseña" pb={30} />
                <PasswordInput label="Confirmar contraseña" pb={30} />
                <Button>Registrarse</Button>
            </Card>
        </Center>
    )
}

export default Register