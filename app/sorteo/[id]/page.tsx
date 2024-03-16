'use client'
import { AppShell, Burger, Group, UnstyledButton, Text, Title, Button, InputLabel, Input, Flex, TextInput, Card, Badge } from '@mantine/core';
import Image from 'next/image';
import styles from './page.module.css'
import { useRef, useState } from 'react';
import CardPrize from '@/components/Lotterys/CardPrize';
import { IconChevronDown } from '@tabler/icons-react';

export default function MobileNavbar() {
  const [opened, setOpened] = useState<boolean | undefined>(false);
  const premios = useRef<HTMLDivElement>(null);


  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
      bg={'#000'}
      
    >
      <AppShell.Header h={'80px'}>
        <Group h="100%" px="md" >
          <Group justify="center" style={{ flex: 1, width: '100%' }}>
            <Image width={150} height={30} alt='logo' src='https://import.cdn.thinkific.com/cdn-cgi/image/width=384,dpr=1,onerror=redirect/643563%2Fcustom_site_themes%2Fid%2FovAKzuZwRfmmwOLdtki8_DEVTALLES-LOGO-VARIANTES.png' />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main style={{overflow: 'hidden', boxSizing:'border-box', padding: 0}}>
        <div className={styles.image}>
            <Image src={'/assets/mountain.webp'} width={2000} height={400} alt='mountain'></Image>
        </div>
        <div className={styles.bg}></div>
        <div className='main' style={{zIndex: 10, position: 'relative'}}>
            
            <Title order={1} style={{textAlign: 'center'}} pt={100}>Sorteo: <span style={{fontSize: '60px'}}>Título del sorteo</span></Title>
            <Title order={1} style={{textAlign: 'center'}} pt={20}>Ronda: 1</Title>

            <Title className={styles.titleTime} order={2}>12:10:23</Title>
            
            
            <Flex style={{zIndex: '2', margin: 'auto'}} gap={20} maw={'400px'} direction={'column'} align={'center'} justify={'center'}>
              <TextInput style={{width:'100%'}} label="Usuario de Discord" variant="filled" size="xl" radius="lg" placeholder="pepito123" />
              <Button fullWidth radius={'lg'} size='xl' color='teal'>Regístrate</Button>
            </Flex>
            <Flex pt={100}>
              <Button  fz={22} leftSection={<IconChevronDown size={30} />}  rightSection={<IconChevronDown size={30} />} style={{margin: 'auto'}} variant="transparent" color="gray" size="xl">Ver premios </Button>
            </Flex>
        </div>
      </AppShell.Main>
      
      <Card bg={'black'} ref={premios}>
        <Flex justify={'center'}>
          <Title order={1} pt={100}>Premios</Title>
        </Flex>

        <Flex wrap={'wrap'} justify={'center'} pt={50} gap={20}>
          <CardPrize></CardPrize>
          <CardPrize></CardPrize>
          <CardPrize></CardPrize>
          <CardPrize></CardPrize>
          <CardPrize></CardPrize>
        </Flex>
      </Card>
    </AppShell>
  );
}