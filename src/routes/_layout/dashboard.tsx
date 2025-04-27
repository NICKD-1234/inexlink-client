import { Container, Grid, Skeleton } from '@mantine/core'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/dashboard')({
  component: RouteComponent,
})

const child = <Skeleton height={140} radius="md" animate={false} />

function RouteComponent() {
  return (
    <Container p={0} my="md">
      <Grid grow gutter="xs">
        <Grid.Col span={4}>{child}</Grid.Col>
        <Grid.Col span={4}>{child}</Grid.Col>
        <Grid.Col span={4}>{child}</Grid.Col>
        <Grid.Col span={4}>{child}</Grid.Col>
        <Grid.Col span={4}>{child}</Grid.Col>
      </Grid>
    </Container>
  )
}
