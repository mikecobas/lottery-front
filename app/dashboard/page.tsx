'use client'
import React from 'react'
import { Anchor, Badge, Button, Card, Center, Grid, Group, Image, Text } from '@mantine/core'

const Home = () => {
    const cardContent = [
        { "title": "Sorteo 1", "status": "Activo", "descripción": "Descripción del sorteo 1" },
        { "title": "Sorteo 2", "status": "Activo", "descripción": "Descripción del sorteo 2" },
        { "title": "Sorteo 3", "status": "Activo", "descripción": "Descripción del sorteo 3" },
        { "title": "Sorteo 4", "status": "Activo", "descripción": "Descripción del sorteo 4" }
    ]
    return (
        <>
            <Group justify='end' style={{ paddingBottom: 16 }} >
                <Anchor href="https://mantine.dev/" target="_blank" underline="hover">
                    Mostrar todos los sorteos
                </Anchor>
            </Group>
            <Grid style={{ paddingBottom: 16 }}>
                {
                    cardContent.map((item, index) => (
                        <Grid.Col span={{ base: 12, md: 6, lg: 3 }} key={index}>
                            <Card shadow="sm" padding="lg" radius="md" withBorder>
                                <Card.Section>
                                    <Image
                                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                                        height={160}
                                        alt="Norway"
                                    />
                                </Card.Section>

                                <Group justify="space-between" mt="md" mb="xs">
                                    <Text fw={500}>{item.title}</Text>
                                    <Badge color="green">{item.status}</Badge>
                                </Group>

                                <Text size="sm" c="dimmed">
                                    {item.descripción}
                                </Text>

                                <Button color="blue" fullWidth mt="md" radius="md">
                                    Ver detalles del sorteo
                                </Button>
                            </Card>
                        </Grid.Col>)
                    )
                }


            </Grid>
        </>
    )
}

export default Home