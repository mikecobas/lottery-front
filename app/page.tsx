'use client';
import Navbar from '@/components/Navbar/Navbar';
import NavbarFooter from '@/components/Navbar/NavbarFooter';
import { AppShell, Avatar, Burger, Center, Group, NavLink, ScrollArea, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';
import Home from './dashboard/home/page';
import Sorteos from './dashboard/sorteos/page';
import PreviewSorteos from '@/components/Previews/PreviewSorteos';


export default function HomePage() {

  const [opened, setOpened] = useState(false)
  const [previewImg, setPreviewImg] = useState({ name: "Sorteo 1", status: true, previewImg: <Skeleton height={160} /> })
  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}

      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            hiddenFrom="sm"
            size="sm"
          />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <AppShell.Section>
          <Group>
            <Burger opened={opened} onClick={() => setOpened(!opened)} hiddenFrom="sm" size="sm" />

          </Group>
        </AppShell.Section>
        <AppShell.Section grow my="md" component={ScrollArea}>
          <Navbar />
        </AppShell.Section>
        <AppShell.Section>
          <Center>
            <NavbarFooter />
          </Center>
          <NavLink
            label="Asaed Reyes Medina"
            description="asaedreyesmedina@gmail.com"
            rightSection={<IconChevronRight />}
            leftSection={
              <Avatar color="cyan" radius="xl">
                ARM
              </Avatar>
            }
          />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <Sorteos />
      </AppShell.Main>
      <AppShell.Aside p="md">
        <PreviewSorteos name={previewImg.name} status={previewImg.status} previewImg={previewImg.previewImg} />
      </AppShell.Aside>
    </AppShell>
  );
}