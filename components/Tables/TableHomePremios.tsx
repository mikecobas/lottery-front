import { PrizesContext } from '@/contexts/PrizesContext';
import usePrizes from '@/hooks/usePrizes';
import { ActionIcon, Button, Card, Group, Table, TextInput, Title } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import ModalCrudPremios from '../Modals/ModalCrudPremios';
import { ModalDelete } from '../Modals/ModalDelete';
import { User } from '@/interfaces/auth.interface';
import { ContestContext } from '@/contexts/ContestContext';
type action = 'edit' | 'create'
export function TableHomePremios() {
    const [localStorageUser, setLocalStorageUser] = useState<User>();
    const { getPrizes } = usePrizes()
    useEffect(() => {
        getPrizes();
    }, [])
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            setLocalStorageUser(user);
        }
    }, []);
    const { state } = useContext(PrizesContext);
    const [nombresSorteos, setNombresSorteos] = useState<any[]>([]);
    const [sorteos, setSorteos] = useState<any[]>([]);
    const { state: stateContest } = useContext(ContestContext);
    const [action, setaction] = useState<action>("create")
    const [openModalEdit, setOpenModalEdit] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)
    const [data, setData] = useState<any>()
    useEffect(() => {
        let tempNombresSorteos: any = []
        let tempSorteos: any = []
        stateContest.payload.map((sorteo) => {
            if (sorteo.createdBy.name === localStorageUser?.name) {
                tempNombresSorteos.push({ label: sorteo.name, value: sorteo._id })
            }
        })
        setNombresSorteos(tempNombresSorteos);
        setSorteos(tempSorteos);
    }, [state, localStorageUser])
    const rows = state.payload
        .filter(prizes => prizes.status === true && nombresSorteos.some(sorteo => sorteo.value === prizes.contestId?._id))
        .map((prizes, index) => (
            <Table.Tr key={index}>
                <Table.Td>{prizes.name}</Table.Td>
                <Table.Td>{prizes.description}</Table.Td>
                <Table.Td>{prizes.contestId?.name}</Table.Td>
                <Table.Td>{prizes.status}</Table.Td>
                <Table.Td>
                    <Group>
                        <ActionIcon variant="filled" aria-label="Settings" onClick={() => { setOpenModalEdit(true), setData(prizes), getPrizes() }}>
                            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon variant="filled" color="red" aria-label="Settings" onClick={() => { setOpenModalDelete(true), getPrizes(), setData(prizes) }}>
                            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Table.Td>
            </Table.Tr>
        ));
    return (
        <>
            {
                rows.length === 0 ? (<Card shadow="sm" p={20} mt={20} style={{ textAlign: 'center' }}>
                    <Title order={3}>No hay premios registrados</Title>
                    <Button onClick={() => { setOpenModalEdit(true), setaction("create") }} >Agregar premio</Button>
                </Card>) : (
                    <Card>
                        <Group justify="space-between" pb={24}>
                            <Title order={1}>Premios</Title>
                            <Button onClick={() => { setOpenModalEdit(true), setaction("create") }} >Agregar premio</Button>
                        </Group>
                        <Table.ScrollContainer minWidth={500} h={350}>
                            <Table striped   >
                                <Table.Thead>
                                    <Table.Tr>
                                        <Table.Th>Nombre del premio</Table.Th>
                                        <Table.Th>Descripción </Table.Th>
                                        <Table.Th>Sorteo</Table.Th>
                                        <Table.Th></Table.Th>
                                        <Table.Th>Acciones</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody>{rows}</Table.Tbody>
                            </Table>
                        </Table.ScrollContainer>
                    </Card>

                )
            }

            <ModalCrudPremios abrirModal={openModalEdit} setModalEdit={setOpenModalEdit} title='Premio' data={data} action={action} />
            <ModalDelete abrirModal={openModalDelete} setModalDelete={setOpenModalDelete} data={data} action='prize' />
        </>
    );
}