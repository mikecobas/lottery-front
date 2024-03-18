'use client'
import React, { useState } from 'react'
import { Grid, Select, TextInput, Text, Image, SimpleGrid, Group, rem, Center, Card, Button, Skeleton, Modal } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath, } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { Contest } from '@/interfaces/constest.inteface';
import useModalCrudSorteos from '@/hooks/useModalCrudSorteos';
import useImageUploader from '@/hooks/useImages';
const initialState = { name: "", contestStatus: "", rounds: 0, contestDate: "", previewImg: <Skeleton height={160} /> };
interface ModalCrudSorteosProps {
    abrirModal?: boolean;
    title?: string
    setModalEdit?: (value: boolean) => void
    data?: Contest
    action: "create" | "edit"
}
export default function ModalCrudSorteos({ action, abrirModal = false, title, setModalEdit = () => { }, data = {
    _id: "",
    name: "",
    status: false,
    rounds: 0,
    contestDate: "",
    createdBy: { _id: "", name: "" },
    image: "",
    createdAt: "",
    contestStatus: "",
} }: ModalCrudSorteosProps) {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { uploadImage } = useImageUploader();
    const { setFiles, setPost, post, files, opened, handleInputChange, newValue, handleStatusChange, handlePostContest, getContests }
        = useModalCrudSorteos(data, abrirModal, setModalEdit, initialState, action, data._id);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageFile(event.target.files[0]);
        }
    };

    const handlePostContests = async () => {
        const action: string = 'create';


        if (imageFile) {
            await uploadImage(`https://privatedevs.com/api-contest/api/v1/uploads/contest/${data._id}`, imageFile, "POST");
        }
        // 
        setPost(initialState);
        close();
    };
    return (
        <>
            <Modal opened={opened} onClose={() => { close(), setModalEdit(false) }} title={title} centered size="xl">
                <Grid>
                    <InputCol label="Nombre del sorteo" placeholder={data?.name}
                        onChange={(e: any) => handleInputChange(e, 'name')} value={newValue?.name} />
                    <StatusCol placeholder={data?.contestStatus} onChange={handleStatusChange} />
                    <InputCol label="Numero de rondas" placeholder={data?.rounds} type='number'
                        onChange={(e: any) => handleInputChange(e, 'rounds')} value={newValue?.rounds} />
                    <InputCol label="Fecha del sorteo" type="datetime-local"
                        onChange={(e: any) => handleInputChange(e, 'contestDate')} value={newValue?.contestDate} />
                    {
                        action === "edit" ? (
                            <>
                                <InputCol label="imagen" placeholder="imagen" type='file' onChange={handleFileChange} />
                            </>
                        ) : null
                    }
                    <ButtonCol onClick={() => { handlePostContest(), getContests(), setModalEdit(false), handlePostContests() }} />
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

const StatusCol = ({ onChange, placeholder = "OPEN | PENDING | FINISHED" }: any) => (
    <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
        <Select
            label="Estado del sorteo"
            placeholder={placeholder}
            data={["OPEN", "PENDING", "FINISHED"]}
            onChange={onChange}
        />
    </Grid.Col>
);

const DropzoneCol = ({ onDrop, ...props }: any) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 8 }}>
        <Dropzone onDrop={onDrop} maxSize={5 * 1024 ** 2} accept={IMAGE_MIME_TYPE} {...props}>
            <Card>
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }} stroke={1.5} />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }} stroke={1.5} />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }} stroke={1.5} />
                    </Dropzone.Idle>
                    <div>
                        <Text size="xl" inline>Drag images here or click to select files</Text>
                        <Text size="sm" c="dimmed" inline mt={7}>Attach as many files as you like, each file should not exceed 5mb</Text>
                    </div>
                </Group>
            </Card>
        </Dropzone>
    </Grid.Col>
);

const PreviewCol = ({ previews }: any) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 4 }} pb={30}>
        <SimpleGrid cols={{ base: 1, sm: 1 }} mt={previews.length > 0 ? 'xl' : 0}>
            <Center>{previews}</Center>
        </SimpleGrid>
    </Grid.Col>
);

const ButtonCol = ({ onClick }: any) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 12 }}>
        <Group justify="end">
            <Button onClick={onClick}>Publicar sorteo</Button>
        </Group>
    </Grid.Col>
);