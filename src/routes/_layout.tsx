import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { createFileRoute, Outlet } from '@tanstack/react-router'

import Navbar from '@/components/Layout/Navbar/Navbar'

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)
  return (
    <AppShell
      navbar={{
        width: { base: desktopOpened ? 260 : 60 },
        breakpoint: 'sm',
      }}
      padding="md"
    >
      {/* Navbar content */}
      <AppShell.Navbar p="md">
        <Navbar desktopOpened={desktopOpened} toggleDesktop={toggleDesktop} />
      </AppShell.Navbar>

      <AppShell.Main h={'100vh'}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
