'use client'
import React, { useContext, useState } from 'react'
import { Grid, Select, TextInput, Text, Image, SimpleGrid, Group, rem, Center, Card, Button } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath, DropzoneProps } from '@mantine/dropzone';
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react';
import { SorteoContext } from '@/contexts/PreviewContext';
import useContestPost from '@/hooks/useContestPost';

const Sorteos = (props: Partial<DropzoneProps>) => {
    const { state, dispatch } = useContext(SorteoContext)
    const { postContest } = useContestPost()
    const [files, setFiles] = useState<FileWithPath[]>([]);
    const handleDrop = (files: FileWithPath[]) => {
        setFiles(files);
        const previews = files.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);
            return <Image key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
        });
        dispatch({ type: 'SET_PREVIEW_IMG', payload: previews });
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'SET_NAME', payload: event.target.value });
    };
    const handleStatusChange = (value: any) => {

        dispatch({ type: 'SET_STATUS', payload: value });
    };
    const handleRoundsChange = (event: any) => {
        dispatch({ type: 'SET_ROUNDS', payload: event.target.value });
    }
    const handleDateChange = (event: any) => {
        dispatch({ type: 'SET_DATE', payload: event.target.value });
    }
    const handlePostContest = () => {
        postContest({ name: state.name, contestStatus: state.contestStatus, rounds: state.rounds, contestDate: state.contestDate, })
    }
    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return <Image height={200} width={200} key={index} src={imageUrl} onLoad={() => URL.revokeObjectURL(imageUrl)} />;
    });
    return (
        <>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6, lg: 4 }}>
                    <TextInput label="Nombre del sorteo" withAsterisk placeholder='Devsorteos 1' onChange={handleNameChange} />
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 6, lg: 3 }}>
                    <Select
                        label="Estado del sorteo"
                        placeholder="OPEN | PENDING | FINISHED"
                        data={["OPEN", " PENDING", "FINISHED"]}
                        onChange={handleStatusChange}
                    />
                </Grid.Col>
                <Grid.Col span={{ base: 6, md: 6, lg: 2 }}>
                    <TextInput label="Numero de rondas" withAsterisk placeholder='1' type='number' onChange={handleRoundsChange} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <TextInput label="Fecha del sorteo" withAsterisk type="date" onChange={handleDateChange} />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 9 }}>
                    <Dropzone
                        onDrop={handleDrop}
                        maxSize={5 * 1024 ** 2}
                        accept={IMAGE_MIME_TYPE}
                        {...props}
                    >
                        <Card>
                            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                                <Dropzone.Accept>
                                    <IconUpload
                                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                                        stroke={1.5}
                                    />
                                </Dropzone.Accept>
                                <Dropzone.Reject>
                                    <IconX
                                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                                        stroke={1.5}
                                    />
                                </Dropzone.Reject>
                                <Dropzone.Idle>
                                    <IconPhoto
                                        style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                                        stroke={1.5}
                                    />
                                </Dropzone.Idle>

                                <div>
                                    <Text size="xl" inline>
                                        Drag images here or click to select files
                                    </Text>
                                    <Text size="sm" c="dimmed" inline mt={7}>
                                        Attach as many files as you like, each file should not exceed 5mb
                                    </Text>
                                </div>
                            </Group>
                        </Card>
                    </Dropzone>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <SimpleGrid cols={{ base: 1, sm: 1 }} mt={previews.length > 0 ? 'xl' : 0}>
                        <Center>
                            {previews}
                        </Center>
                    </SimpleGrid>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6, lg: 12 }}>
                    <Group justify="end">

                        <Button onClick={handlePostContest}>Publicar sorteo</Button>


                    </Group>
                </Grid.Col>
            </Grid>
        </>
    )
}

export default Sorteos