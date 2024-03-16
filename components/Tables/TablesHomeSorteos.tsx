import { ContestContext } from '@/contexts/ContestContext';
import useContest from '@/hooks/useConstest';
import { Table } from '@mantine/core';
import { useContext } from 'react';

export function TableHomeSorteos() {
    useContest()
    const { state } = useContext(ContestContext);
    const rows = state.payload.map((contest, index) => (
        <Table.Tr key={index}>
            <Table.Td>{contest.name}</Table.Td>
            <Table.Td>{contest.rounds}</Table.Td>
            <Table.Td>{contest.contestStatus}</Table.Td>
            <Table.Td>{contest.createdBy.name}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Table.ScrollContainer minWidth={500} h={350}>
            <Table striped highlightOnHover  >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Nombre del sorteo</Table.Th>
                        <Table.Th>Rondas </Table.Th>
                        <Table.Th>Estado</Table.Th>
                        <Table.Th>Creado por</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}