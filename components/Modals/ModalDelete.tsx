import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Title, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Contest } from '@/interfaces/constest.inteface';
import { Payload } from '@/interfaces/prizes.interfaces';
import useApi from '@/api/useApi';


interface ModalDeleteProps {
    abrirModal: boolean;
    title?: string;
    setModalDelete: (value: boolean) => void;
    data: Contest | undefined
    action?: "contest" | "prize";
}

export function ModalDelete({ abrirModal = true, title, setModalDelete = () => { }, data, action }: ModalDeleteProps) {
    const [opened, { open, close }] = useDisclosure(false);
    const [newData, setNewData] = useState<Contest | Payload>({} as Contest | Payload)
    const { del } = useApi();
    useEffect(() => {
        abrirModal ? open() : close()
    }, [abrirModal, close])
    useEffect(() => {
        if (data) {
            setNewData(data);
        }
    }, [])
    const handleDelete = async () => {
        setModalDelete(false);
        let endpoint = '';
        if (action === 'contest') {
            endpoint = `https://privatedevs.com/api-contest/api/v1/contests/${data?._id}`;
        } else if (action === 'prize') {
            endpoint = `https://privatedevs.com/api-contest/api/v1/prizes/${data?._id}`;
        }
        try {
            await del(endpoint);
        } catch (error) {
            console.error(error);
        }
        close();
    }

    return (
        <>
            <Modal centered opened={opened} onClose={() => { close(), setModalDelete(false) }} title={title}>
                <Title pb={24} order={4}>Estas seguro de Elimnar {title} {newData?.name}</Title>
                <Group justify="end">
                    <Group justify="space-between">
                        <Button onClick={close}>Cancel</Button>
                        <Button color="red" onClick={handleDelete}>Delete</Button>
                    </Group>
                </Group>
            </Modal>
        </>
    );
}