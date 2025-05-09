import React, { useEffect } from 'react'
import { Container, Grid, Skeleton, SimpleGrid } from '@mantine/core'
import { Pie, Bar } from 'react-chartjs-2'

import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js'

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
)

import { useDashboardStore, type DashboardState } from '@/stores/dashboardStore'
import EmissionForm from '../EmissionForm/EmissionForm'

const PRIMARY_COL_HEIGHT = '300px'

export default function Dashboard() {
  const dashboardData = useDashboardStore((state) => state.dashboardState)

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ['dashboardData', formData], // Query key including formData
  //   queryFn: () => fetchDashboardData(formData!), // Send formData to the API
  //   enabled: !!formData, // Only run the query if formData is available
  // })

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`

  const isLoading = !dashboardData

  if (!dashboardData) {
    return (
      <Container my="md">
        <EmissionForm />
      </Container>
    )
  }

  return (
    <Container my="md">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {/* <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} /> */}
        {isLoading ? (
          <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
        ) : (
          <div
            style={{ marginTop: '40px' }}
            dangerouslySetInnerHTML={{ __html: dashboardData.map_html }}
          />
        )}

        {/* //<div style={{ maxWidth: '500px', margin: 'auto' }}>
          // <div>
          //   <h3>Global vs Local Emissions</h3>
          //   <Pie
          //     data={{
          //       labels: dashboardData.chart_data.labels,
          //       datasets: [
          //         {
          //           data: dashboardData.chart_data.values,
          //           backgroundColor: dashboardData.chart_data.colors,
          //         },
          //       ],
          //     }}
          //   />
            // </div> */}

        <Grid gutter="md">
          <Grid.Col>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Skeleton
              height={SECONDARY_COL_HEIGHT}
              radius="md"
              animate={false}
            />
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  )
}

{
  /* <Grid.Col span={{ base: 12, xs: 4 }}>
          {isLoading ? (
            <Skeleton height={200} />
          ) : (
            <div style={{ maxWidth: '500px', margin: 'auto' }}>
              <h3>Global vs Local Emissions</h3>
              <Pie
                data={{
                  labels: dashboardData.chart_data.labels,
                  datasets: [
                    {
                      data: dashboardData.chart_data.values,
                      backgroundColor: dashboardData.chart_data.colors,
                    },
                  ],
                }}
              />
            </div>
          )}
        </Grid.Col>

        <Grid.Col span={{ base: 12, xs: 8 }}>
          {isLoading ? (
            <Skeleton height={200} />
          ) : (
            <div
              style={{ maxWidth: '600px', margin: 'auto', marginTop: '30px' }}
            >
              <h3>Component-wise Emissions</h3>
              <Bar
                data={{
                  labels: dashboardData.component_chart.labels,
                  datasets: [
                    {
                      label: 'Emissions (kg CO₂)',
                      data: dashboardData.component_chart.values,
                      backgroundColor: dashboardData.component_chart.colors,
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: { display: true, text: 'Emissions (kg CO₂)' },
                    },
                  },
                }}
              />
            </div>
          )}
        </Grid.Col> */
}
