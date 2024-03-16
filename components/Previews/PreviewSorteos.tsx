import React, { useContext } from 'react'
import { Anchor, Badge, Button, Card, Center, Grid, Group, Image, Text } from '@mantine/core'
import { Contest } from '@/interfaces/constest.inteface'
import { SorteoContext } from '@/contexts/PreviewContext'

const PreviewSorteos = () => {
    const { state, dispatch } = useContext(SorteoContext)
    return (
        <>
            <Card shadow="sm" padding="xs" radius="md" withBorder>
                <Card.Section>
                    {state.previewImg}
                </Card.Section>

                <Group mt="lg" mb="xs">
                    <Text fw={500}>{state.name}</Text>
                    <Badge color={state.status ? "green" : "red"}>{state.status ? "Activo" : "Finalizado"}</Badge>
                    <Badge color="blue">{`Rondas: ${state.rounds}`}</Badge>
                </Group>
                <Text size="sm" c="dimmed">
                    {state.description}
                </Text>

            </Card>
        </>
    )
}

export default PreviewSorteos