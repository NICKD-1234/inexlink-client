import React, { useEffect } from 'react'
import {
  Container,
  Grid,
  Paper,
  Title,
  Center,
  Skeleton,
  SimpleGrid,
} from '@mantine/core'

import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { useDashboardStore, type DashboardState } from '@/stores/dashboardStore'
import EmissionForm from '../EmissionForm/EmissionForm'

import DeliveryPieChart from './DeliveryPieChart'
import MaterialEmissionChart from './MaterialEmissionsChart'

const PRIMARY_COL_HEIGHT = '300px'

export default function Dashboard() {
  const dashboardData = useDashboardStore((state) => state.dashboardState)

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['dashboardData', formData], // Query key including formData
  //   queryFn: () => fetchDashboardData(formData!), // Send formData to the API
  //   enabled: !!formData, // Only run the query if formData is available
  // })

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2.5 - var(--mantine-spacing-md) / 2)`

  if (!dashboardData) {
    return (
      <Center h={'100%'}>
        <EmissionForm />
      </Center>
    )
  }

  return (
    <>
      <Title px={'sm'}>Emissions Dashboard</Title>
      <Container fluid my="md">
        <Grid>
          <Grid.Col span={4}>
            <Paper
              shadow="sm"
              radius="md"
              p="md"
              withBorder
              style={{ height: SECONDARY_COL_HEIGHT }}
            >
              1
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Paper
              shadow="sm"
              radius="md"
              p="md"
              withBorder
              style={{ height: SECONDARY_COL_HEIGHT }}
            >
              2
            </Paper>
          </Grid.Col>
          <Grid.Col span={4}>
            <Paper
              shadow="sm"
              radius="md"
              p="md"
              withBorder
              style={{ height: SECONDARY_COL_HEIGHT }}
            >
              3
            </Paper>
          </Grid.Col>

          <Grid.Col span={6}>
            <Paper shadow="sm" radius="md" p="md" withBorder>
              <MaterialEmissionChart
                labels={dashboardData.component_chart.labels}
                values={dashboardData.component_chart.values}
                colors={dashboardData.component_chart.colors}
                title="Component-wise Emissions"
              />
            </Paper>
          </Grid.Col>

          <Grid.Col span={6}>
            <Paper shadow="sm" radius="md" p="md" withBorder>
              <DeliveryPieChart
                labels={dashboardData.chart_data.labels}
                values={dashboardData.chart_data.values}
                colors={dashboardData.chart_data.colors}
                title="Global vs Local Emissions"
              />
            </Paper>
          </Grid.Col>

          {/* <Grid.Col span={12}>
            <Paper shadow="sm" radius="md" p="xs" withBorder>
              <div
                dangerouslySetInnerHTML={{ __html: dashboardData.map_html }}
              />
            </Paper>
          </Grid.Col> */}
        </Grid>
      </Container>
    </>
  )
}
// return (
//   <Container w={'100%'} my="md">
//     <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
//       {isLoading ? (
//         <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
//       ) : (
//         <div style={{ maxWidth: '400px' }}>
//           <DeliveryPieChart
//             labels={dashboardData.chart_data.labels}
//             values={dashboardData.chart_data.values}
//             colors={dashboardData.chart_data.colors}
//             title="Global vs Local Emissions"
//           />
//         </div>
//       )}

//       <Grid gutter="md">
//         <Grid.Col>
//           <MaterialEmissionChart
//             labels={dashboardData.component_chart.labels}
//             values={dashboardData.component_chart.values}
//             colors={dashboardData.component_chart.colors}
//             title="Component-wise Emissions"
//           />
//         </Grid.Col>

//         <Grid.Col span={6}>
//           <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
//         </Grid.Col>

//         <Grid.Col span={6}>
//           <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
//         </Grid.Col>
//       </Grid>
//     </SimpleGrid>

//     {/* Map */}
//     {/* {!isLoading && (
//       <div
//         style={{
//           width: '100%',
//           marginTop: '1rem',
//         }}
//         dangerouslySetInnerHTML={{ __html: dashboardData.map_html }}
//       />
//     )} */}
//   </Container>
// )
