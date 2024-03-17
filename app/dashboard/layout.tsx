'use client';
import { useContext, useState, useEffect } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import NavbarFooter from '@/components/Navbar/NavbarFooter';
import { AppShell, Avatar, Burger, Center, Group, NavLink, ScrollArea, Skeleton, Title } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { AuthContext } from '@/contexts/AuthContext'
import { User } from '@/interfaces/auth.interface';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { state } = useContext(AuthContext)
  const [opened, setOpened] = useState(false)
  const [localStorageUser, setLocalStorageUser] = useState<User>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setLocalStorageUser(user);
    }
  }, []);

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}

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
          {

            localStorageUser ? (
              <NavLink
                label={localStorageUser ? localStorageUser.name : "Anónimo"}
                description={localStorageUser ? localStorageUser.email : "Inicia sesión"}
                rightSection={<IconChevronRight />}
                leftSection={
                  <Avatar color="cyan" radius="xl">
                    ARM
                  </Avatar>
                }
              />
            ) : null
          }
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}