import {
  AppShell,
  Burger,
  Flex,
  NavLink,
  Tooltip,
  UnstyledButton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { IconHome, IconFileReport, IconFilePlus } from '@tabler/icons-react'
import classes from './Navbar.module.css'

export const Route = createFileRoute('/_layout')({
  component: LayoutComponent,
})

interface NavbarLinkProps {
  icon: typeof IconHome
  label: string
  active?: boolean
  link: string
  onClick?: () => void
}

function NavbarLink({
  icon: Icon,
  label,
  active,
  link,
  onClick,
}: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <Link to={link} style={{ textDecoration: 'none' }}>
        <UnstyledButton
          onClick={onClick}
          data-active={active || undefined}
          className={classes.link}
        >
          <Icon size={20} stroke={1.5} />
        </UnstyledButton>
      </Link>
    </Tooltip>
  )
}

const navLinks = [
  { icon: IconHome, label: 'Home', link: '/dashboard' },
  { icon: IconFileReport, label: 'Reports', link: '/reports' },
  { icon: IconFilePlus, label: 'New Report', link: '/reports/new' },
]

function LayoutComponent() {
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

  const renderNavbarNavLinks = navLinks.map((navLink, index) => {
    if (desktopOpened) {
      return (
        <NavLink
          key={navLink.label} // Add a unique key to avoid React warnings
          component={Link}
          to={navLink.link}
          label={navLink.label}
        />
      )
    } else {
      return <NavbarLink {...navLink} key={navLink.label} />
    }
  })

  return (
    <AppShell
      navbar={{
        width: { base: desktopOpened ? 300 : 60 },
        breakpoint: 'sm',
      }}
      padding="md"
    >
      {/* Navbar content */}
      <AppShell.Navbar p="md">
        <AppShell.Section>
          <Flex justify="flex-end">
            <Burger
              opened={desktopOpened}
              onClick={toggleDesktop}
              visibleFrom="sm"
              size="sm"
            />
          </Flex>
        </AppShell.Section>

        <AppShell.Section grow mt="md">
          <Flex direction="column" justify="center" align="center" gap={0}>
            {renderNavbarNavLinks}
          </Flex>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main h={'100vh'}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
