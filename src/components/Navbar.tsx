import { AppShellNavbar, Stack, NavLink } from '@mantine/core'
import { Link } from '@tanstack/react-router'

export function CustomNavbar() {
  return (
    <AppShellNavbar p="md" w={{ sm: 300, lg: 300 }}>
      <Stack>
        <NavLink component={Link} to="/" label="Home" />
        <NavLink component={Link} to="/posts" label="Posts" />
      </Stack>
    </AppShellNavbar>
  )
}
