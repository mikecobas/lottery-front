'use client'
import { TableHomeSorteos } from '@/components/Tables/TablesHomeSorteos';
import { Card, Grid } from '@mantine/core';
import React from 'react'

const Home = () => {
    return (
        <>
            <Grid>
                <Grid.Col span={{ base: 12, md: 6, lg: 12 }}>
                    <Card>
                        <TableHomeSorteos />
                    </Card>
                </Grid.Col>
            </Grid>
        </>
    )
}

export default Home