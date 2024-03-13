import { Grid, TextInput } from '@mantine/core'
import React from 'react'
import { Contest } from '@/interfaces/constest.inteface'
const Sorteos = ({ }: Contest) => {
    return (
        <>
            <Grid>
                <Grid.Col>
                    <TextInput label="Nombre del sorteo" />
                </Grid.Col>
            </Grid>
        </>
    )
}

export default Sorteos