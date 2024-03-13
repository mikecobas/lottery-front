import { Center, MantineColorScheme, SegmentedControl, useMantineColorScheme } from '@mantine/core'
import { IconCode, IconEye, IconMoon, IconSun } from '@tabler/icons-react'
import React, { useEffect, useState } from 'react'

const NavbarFooter = () => {
  const [value, setValue] = useState('dark');
  const { setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    setColorScheme(value as MantineColorScheme);
  }, [value])

  return (
    <>
      <SegmentedControl
      style={{marginBottom: 16}}
        onChange={setValue}
        data={[
          {
            value: 'dark',
            label: (
              <Center style={{ gap: 10 }}>
                <IconMoon />
                <span>Dark</span>
              </Center>
            ),
          },
          {
            value: 'light',
            label: (
              <Center style={{ gap: 10 }}>
                <IconSun />
                <span>Light</span>
              </Center>
            ),
          },
        ]}
      />
    </>
  )
}

export default NavbarFooter