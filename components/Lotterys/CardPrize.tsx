import { Card, Group, Text, Button, Badge,  } from '@mantine/core'
import React from 'react'
import Image from 'next/image'

const CardPrize = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder maw={300}>
        <Card.Section>
            <Image
                src="https://officemax.vtexassets.com/arquivos/ids/1370072-800-800?v=638204828424800000&width=800&height=800&aspect=true"
                height={160}
                width={200}
                style={{width:'100%', height: 'auto', aspectRatio: '2/1', objectFit: 'cover'}}
                alt="Norway"
            />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Teclado Gamer</Text>
            <Badge color="green">Disponible</Badge>
        </Group>

        <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and
        activities on and around the fjords of Norway
        </Text>

  </Card>
  )
}

export default CardPrize