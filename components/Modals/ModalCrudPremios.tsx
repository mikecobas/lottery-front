'use client'
import { useDisclosure } from '@mantine/hooks';
import React, { useContext, useEffect, useState } from 'react'
import { Grid, TextInput, Image, SimpleGrid, Group, rem, Center, Card, Button, Skeleton, Modal, Textarea, Text, Select } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import useContestPost from '@/hooks/useContestPost';
import { Payload } from '@/interfaces/prizes.interfaces';
import useApi from '@/api/useApi';
import usePrizes from '@/hooks/usePrizes';
import useContest from '@/hooks/useConstest';
import { ContestContext } from '@/contexts/ContestContext';
import { User } from '@/interfaces/auth.interface';
import useImageUploader from '@/hooks/useImages';

const initialState = { name: "", description: "", contestId: 0, orderToLot: 1 };

interface ModalCrudSorteosProps {
    abrirModal?: boolean;
    title?: string
    setModalEdit?: (value: boolean) => void
    data?: Payload | undefined
    action: "create" | "edit"
}

export default function ModalCrudPremios({ action, abrirModal = false, title, setModalEdit = () => { }, data = {
    name: "",
    description: ""
} }: ModalCrudSorteosProps) {
    const [localStorageUser, setLocalStorageUser] = useState<User>();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            setLocalStorageUser(user);
        }
    }, []);
    const [nombresSorteos, setNombresSorteos] = useState<any[]>([]);
    const [sorteos, setSorteos] = useState<any[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const { getPrizes } = usePrizes()
    const { getContests } = useContest()
    const { state } = useContext(ContestContext)
    const [opened, { open, close }] = useDisclosure(false);
    const [post, setPost] = useState(initialState);
    const [newValue, setNewValue] = useState(data)
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const { post: postApi, put: putApi } = useApi();
    const { uploadImage } = useImageUploader();
    useEffect(() => {
        abrirModal ? open() : close()
    }, [abrirModal])
    useEffect(() => {
        getContests();
    }, [])
    useEffect(() => {
        let tempNombresSorteos: any = []
        let tempSorteos: any = []
        state.payload.map((sorteo) => {
            if (sorteo.createdBy.name === localStorageUser?.name && sorteo.status === true) {
                tempNombresSorteos.push({ label: sorteo.name, value: sorteo._id })
            }
        })
        // Actualizar estados
        setNombresSorteos(tempNombresSorteos);
        setSorteos(tempSorteos);

    }, [state, localStorageUser])
    useEffect(() => {

    }, [data])



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setPost({ ...post, [field]: event.target.value });
        setNewValue({ ...newValue, [field]: event.target.value });
    };
    const handleStatusChange = (value: any) => {
        setPost({ ...post, contestId: value });
        setNewValue({ ...newValue, contestId: value });
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageFile(event.target.files[0]);
        }
    };

    const handlePostPrizes = async () => {
        const action: string = 'create';

        if (action === 'create') {
            await postApi('https://privatedevs.com/api-contest/api/v1/prizes/create', { name: post.name, description: post.description, contestId: post.contestId, orderToLot: post.orderToLot });
        } else if (action === 'edit' && data) {
            await putApi(`https://privatedevs.com/api-contest/api/v1/prizes/${data._id}`, { name: post.name, description: post.description, contestId: post.contestId, orderToLot: post.orderToLot });
        }

        if (imageFile) {
            await uploadImage(`https://privatedevs.com/api-contest/api/v1/uploads/prizes/${data._id}`, imageFile, "PUT");
        }
        // 
        setPost(initialState);
        close();
    };




    return (
        <>
            <Modal opened={opened} onClose={() => { close(), setModalEdit(false) }} title={title} centered size="xl">
                <Grid>
                    <InputCol label="Nombre del premio" placeholder={data?.name} onChange={(e: any) => handleInputChange(e, 'name')} value={newValue?.name} />
                    <InputCol label="Orden de ronda" placeholder={data?.orderToLot} type='number' onChange={(e: any) => handleInputChange(e, 'orderToLot')} />
                    <StatusCol onChange={handleStatusChange} sorteos={nombresSorteos} />
                    <TextCol label="Descripción" onChange={(e: any) => handleInputChange(e, 'description')} value={newValue?.description} />
                    {
                        action === "edit" ? (
                            <>
                                <InputCol label="imagen" placeholder="imagen" type='file' onChange={handleFileChange} />
                            </>
                        ) : null
                    }

                    <ButtonCol onClick={() => { handlePostPrizes(), getPrizes(), setModalEdit(false) }} />
                </Grid>
            </Modal>
        </>
    );
}

// cuerpo del formulario
const InputCol = ({ label, placeholder, type, onChange, value }: any) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
        <TextInput label={label} withAsterisk placeholder={placeholder} type={type} onChange={onChange} value={value} />
    </Grid.Col>
);
const TextCol = ({ label, placeholder, onChange, value }: any) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
        <Textarea label={label} withAsterisk placeholder={placeholder} onChange={onChange} value={value} />
    </Grid.Col>
);

const StatusCol = ({ onChange, placeholder = "OPEN | PENDING | FINISHED", sorteos }: any) => (
    <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
        <Select
            label="Estado del sorteo"
            placeholder={placeholder}
            data={sorteos}
            onChange={onChange}
        />
    </Grid.Col>
);


const ButtonCol = ({ onClick }: any) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 12 }}>
        <Group justify="end">
            <Button onClick={onClick}>Publicar sorteo</Button>
        </Group>
    </Grid.Col>
);


