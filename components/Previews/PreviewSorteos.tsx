import React, { useContext } from 'react'
import { Anchor, Badge, Button, Card, Center, Grid, Group, Image, Text } from '@mantine/core'
import { Contest } from '@/interfaces/constest.inteface'
import { SorteoContext } from '@/contexts/PreviewContext'
export interface PreviewSorteosProps extends Contest {
    previewImg: JSX.Element
}
const PreviewSorteos = ({ name, status, previewImg, rounds }: PreviewSorteosProps) => {
    const { state, dispatch } = useContext(SorteoContext)
    return (
        <>
            <Card shadow="sm" padding="xs" radius="md" withBorder>
                <Card.Section>
                    {state.previewImg}
                </Card.Section>

                <Group mt="md" mb="xs">
                    <Text fw={500}>{state.name}</Text>
                    <Badge color={state.status ? "green" : "red"}>{state.status ? "Activo" : "Finalizado"}</Badge>
                    <Badge color="blue">{`Rondas: ${1}`}</Badge>
                </Group>
                <Text size="sm" c="dimmed">
                    Descripción del sorteo
                </Text>

            </Card>
        </>
    )
}

export default PreviewSorteos