import { Card, Group, Text, Button, Badge,  } from '@mantine/core'
import React from 'react'
import Image from 'next/image'

interface Props {
    name: string,
    image: string,
    markAsDelivery: boolean,
    description?: string
}

const CardPrize = ({name, image, markAsDelivery, description}: Props) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder maw={300}>
        <Card.Section>
            <Image
                src={(image !== 'no-image.jpg' && image !== '') ? image : 'https://officemax.vtexassets.com/arquivos/ids/1370072-800-800?v=638204828424800000&width=800&height=800&aspect=true'}
                height={160}
                width={200}
                style={{width:'100%', height: 'auto', aspectRatio: '2/1', objectFit: 'cover'}}
                alt="Norway"
            />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
            <Text maw={150} fw={500}>{name}</Text>
            {markAsDelivery ? <Badge color="red">Sorteado</Badge> : <Badge color="green">Disponible</Badge>}
        </Group>

        <Text size="sm" c="dimmed">
            {description}
        </Text>

  </Card>
  )
}

export default CardPrize