import { Badge, Button, Card, Center, Grid, Group, Image, Text } from '@mantine/core'
import React from 'react'

const Home = () => {
    return (
        <>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Card shadow="sm" padding="lg" radius="md" withBorder>
                        <Card.Section>
                            <Image
                                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                                height={160}
                                alt="Norway"
                            />
                        </Card.Section>

                        <Group justify="space-between" mt="md" mb="xs">
                            <Text fw={500}>Nombre del sorteo</Text>
                            <Badge color="pink">Status</Badge>
                        </Group>

                        <Text size="sm" c="dimmed">
                           Descripción del sorteo
                        </Text>

                        <Button color="blue" fullWidth mt="md" radius="md">
                            Ver detalles del sorteo
                        </Button>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>1</Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>3</Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>4</Grid.Col>
            </Grid>
        </>
    )
}

export default Home