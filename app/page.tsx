'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import NavbarFooter from '@/components/Navbar/NavbarFooter';
import { AppShell, Avatar, Burger, Center, Group, NavLink, ScrollArea, Skeleton, Title } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Sorteos from './dashboard/sorteos/page';
import PreviewSorteos from '@/components/Previews/PreviewSorteos';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';


export default function HomePage() {

  const [opened, setOpened] = useState(false)
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
        <Login />
      </AppShell.Main>
      <AppShell.Aside p="xs">
        <Title order={3} pb={30} pt={10}>Preview:</Title>
        <PreviewSorteos />
      </AppShell.Aside>
    </AppShell>
  );
}