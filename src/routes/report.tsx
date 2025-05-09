import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useMutation } from '@tanstack/react-query'
import {
  TextInput,
  Select,
  Button,
  Group,
  Container,
  Title,
  Space,
} from '@mantine/core'

// Define the route for "/report"
export const Route = createFileRoute('/report')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Container>PDF will display here</Container>
}
