'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Grid, Select, TextInput, Text, Image, SimpleGrid, Group, rem, Center, Card, Button, Skeleton } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath, DropzoneProps } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { SorteoContext } from '@/contexts/PreviewContext';
import useContestPost from '@/hooks/useContestPost';

const initialState = { name: "", contestStatus: "", rounds: 0, contestDate: "", previewImg: <Skeleton height={160} /> };

const Sorteos = (props: Partial<DropzoneProps>) => {
    const [post, setPost] = useState(initialState);
    const { state, dispatch } = useContext(SorteoContext);
    const { postContest } = useContestPost();
    const [files, setFiles] = useState<FileWithPath[]>([]);

    useEffect(() => {
        dispatch({ type: 'SET_PREVIEW', payload: post });
    }, [post]);

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
        dispatch({ type: 'SET_PREVIEW', payload: post });
        postContest({ name: state.name, contestStatus: state.contestStatus, rounds: state.rounds, contestDate: state.contestDate, });
        setPost(initialState);
        dispatch({ type: 'SET_PREVIEW', payload: post });
    };

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image height={200} width={200} key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    });

    return (
        <Grid>
            <InputCol label="Nombre del sorteo" placeholder='Devsorteos 1' onChange={(e: any) => handleInputChange(e, 'name')} />
            <StatusCol onChange={handleStatusChange} />
            <InputCol label="Numero de rondas" placeholder='1' type='number' onChange={(e: any) => handleInputChange(e, 'rounds')} />
            <InputCol label="Fecha del sorteo" type="datetime-local" onChange={(e: any) => handleInputChange(e, 'contestDate')} />
            <DropzoneCol onDrop={handleDrop} {...props} />
            <PreviewCol previews={previews} />
            <ButtonCol onClick={handlePostContest} />
        </Grid>
    )
}

const InputCol = ({ label, placeholder, type, onChange }: any) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
        <TextInput  label={label} withAsterisk placeholder={placeholder} type={type} onChange={onChange} />
    </Grid.Col>
);

const StatusCol = ({ onChange }: any) => (
    <Grid.Col span={{ base: 6, md: 6, lg: 3 }}>
        <Select
            label="Estado del sorteo"
            placeholder="OPEN | PENDING | FINISHED"
            data={["OPEN", " PENDING", "FINISHED"]}
            onChange={onChange}
        />
    </Grid.Col>
);

const DropzoneCol = ({ onDrop, ...props }: any) => (
    <Grid.Col span={{ base: 12, md: 6, lg: 9 }}>
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
    <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
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

export default Sorteos