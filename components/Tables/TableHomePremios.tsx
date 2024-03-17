import { ContestContext } from '@/contexts/ContestContext';
import useContest from '@/hooks/useConstest';
import { ActionIcon, Card, Group, Table, TextInput, Title } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useContext } from 'react';

export function TableHomePremios() {
    useContest()
    const { state } = useContext(ContestContext);
    const rows = state.payload.map((contest, index) => (
        <Table.Tr key={index}>
            <Table.Td>{contest.name}</Table.Td>
            <Table.Td>{contest.rounds}</Table.Td>
            <Table.Td>{contest.contestStatus}</Table.Td>
            <Table.Td>{contest.createdBy.name}</Table.Td>
            <Table.Td>
                <Group>
                    <ActionIcon variant="filled" aria-label="Settings">
                        <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon variant="filled" color="red" aria-label="Settings">
                        <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <Card>
            <Group justify="space-between" pb={24}>
                <Title order={1}>Sorteos</Title>
                <TextInput placeholder='Buscar sorteo' />
            </Group>
            <Table.ScrollContainer minWidth={500} h={350}>
                <Table striped  horizontalSpacing="xl"  >
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Nombre del sorteo</Table.Th>
                            <Table.Th>Rondas </Table.Th>
                            <Table.Th>Estado</Table.Th>
                            <Table.Th>Creado por</Table.Th>
                            <Table.Th>Acciones</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </Table.ScrollContainer>
        </Card>
    );
}