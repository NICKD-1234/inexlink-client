import { Container, Grid, Skeleton } from '@mantine/core'

import classes from './Dashboard.module.css'

const child = <Skeleton height={140} radius="md" animate={false} />

export default function Dashboard() {
  return (
    <Grid>
      <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 8 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 4 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 3 }}>{child}</Grid.Col>
      <Grid.Col span={{ base: 12, xs: 6 }}>{child}</Grid.Col>
    </Grid>
  )
}
