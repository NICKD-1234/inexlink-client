import { Container } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

import Dashboard from '@/components/Dashboard/Dashboard'

export const Route = createFileRoute('/_layout/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Container p={0} my="md">
      <Dashboard />
    </Container>
  )
}
