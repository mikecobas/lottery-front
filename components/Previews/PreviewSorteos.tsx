import React, { useContext } from 'react'
import { Badge, Card, Group, Text } from '@mantine/core'
import { SorteoContext } from '@/contexts/PreviewContext'

const PreviewSorteos = () => {
    const { state } = useContext(SorteoContext)
    return (
        <>
            <Card shadow="sm" padding="xs" radius="md" withBorder>
                <Card.Section>
                    {state.previewImg}
                </Card.Section>

                <Group mt="lg" mb="xs">
                    <Text fw={500}>{state.name}</Text>
                    <Badge color={state.contestStatus === "OPEN" ? "green" : state.contestStatus === "PENDING" ? "gray" : "red"}>{state.contestStatus}</Badge>
                    <Badge color="blue">{`Rondas: ${state.rounds}`}</Badge>
                </Group>
                <Text size="sm" c="dimmed">

                </Text>

            </Card>
        </>
    )
}

export default PreviewSorteos