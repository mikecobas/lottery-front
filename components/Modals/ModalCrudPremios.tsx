'use client'
import { useDisclosure } from '@mantine/hooks';
import React, { useEffect, useState } from 'react'
import { Grid, Select, TextInput, Text, Image, SimpleGrid, Group, rem, Center, Card, Button, Skeleton, Modal } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import useContestPost from '@/hooks/useContestPost';
const initialState = { name: "", contestStatus: "", rounds: 0, contestDate: "", previewImg: <Skeleton height={160} /> };
interface ModalCrudSorteosProps {
    abrirModal?: boolean;
    title?: string
    setModalEdit?: (value: boolean) => void
}
export default function ModalCrudPremios({ abrirModal = true, title, setModalEdit = () => { } }: ModalCrudSorteosProps) {
    const [opened, { open, close }] = useDisclosure(true);
    const [post, setPost] = useState(initialState);
    const { postContest } = useContestPost();
    const [files, setFiles] = useState<FileWithPath[]>([]);
    useEffect(() => {
        abrirModal ? open() : close()
    }, [abrirModal, close])

    const handleDrop = (files: FileWithPath[]) => {
        setFiles(files);
        const previews = files.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);
            return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
        });
        setPost({ ...post, previewImg: previews[0] });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setPost({ ...post, [field]: event.target.value });
    };

    const handleStatusChange = (value: any) => {
        setPost({ ...post, contestStatus: value });
    };

    const handlePostContest = () => {
        postContest({ name: post.name, contestStatus: post.contestStatus, rounds: post.rounds, contestDate: post.contestDate, });
        setPost(initialState);
        close();
    };

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image height={200} width={200} key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    });

    return (
        <>
            <Modal opened={opened} onClose={() => { close(), setModalEdit(false) }} title="Sorteos" centered size="xl">
                <Grid>
                    <InputCol label="Nombre del sorteo" placeholder='Devsorteos 1' onChange={(e: any) => handleInputChange(e, 'name')} />
                    <StatusCol onChange={handleStatusChange} />
                    <InputCol label="Numero de rondas" placeholder='1' type='number' onChange={(e: any) => handleInputChange(e, 'rounds')} />
                    <InputCol label="Fecha del sorteo" type="datetime-local" onChange={(e: any) => handleInputChange(e, 'contestDate')} />
                    <DropzoneCol onDrop={handleDrop} />
                    <PreviewCol previews={previews} />
                    <ButtonCol onClick={handlePostContest} />
                </Grid>
            </Modal>
        </>
    );
}

// cuerpo del formulario
const InputCol = ({ label, placeholder, type, onChange }: any) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
        <TextInput label={label} withAsterisk placeholder={placeholder} type={type} onChange={onChange} />
    </Grid.Col>
);

const StatusCol = ({ onChange }: any) => (
    <Grid.Col span={{ base: 6, md: 6, lg: 6 }}>
        <Select
            label="Estado del sorteo"
            placeholder="OPEN | PENDING | FINISHED"
            data={["OPEN", " PENDING", "FINISHED"]}
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