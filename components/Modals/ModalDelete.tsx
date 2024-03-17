import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Title, Group } from '@mantine/core';
import { useEffect } from 'react';
interface ModalDeleteProps {
    abrirModal: boolean;
    title?: string;
    setModalDelete: (value: boolean) => void;
}
export function ModalDelete({ abrirModal = true, title, setModalDelete = () => { } }: ModalDeleteProps) {
    const [opened, { open, close }] = useDisclosure(false);
    useEffect(() => {
        abrirModal ? open() : close()
    }, [abrirModal, close])
    return (
        <>
            <Modal centered opened={opened} onClose={() => { close(), setModalDelete(false) }} title="Authentication">
                <Title pb={24} order={4}>Are you sure you want to delete this item?</Title>
                <Group justify="end">
                    <Group justify="space-between">
                        <Button onClick={close}>Cancel</Button>
                        <Button color="red" onClick={() => { close(), setModalDelete(false) }}>
                            Delete</Button>
                    </Group>
                </Group>
            </Modal>
        </>
    );
}