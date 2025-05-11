import React, { useState } from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer'

import { useDashboardStore } from '@/stores/dashboardStore'
import DeliveryPieChart from '../Dashboard/DeliveryPieChart'
import MaterialEmissionChart from '../Dashboard/MaterialEmissionsChart'
import ChartToImage from './ChartToImage'

import PieChart from './PieChart'
import BarChart from './BarChart'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1a365d',
    fontWeight: 'bold',
  },
  subheader: {
    fontSize: 18,
    marginBottom: 10,
    color: '#2d3748',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    width: '48%',
  },
  chartPlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
  },
  summaryBox: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f8fafc',
  },
})

const PDFDocument = ({ data }: { data: any }) => {
  // Transform your chart data to the format expected by our components
  const materialData = data.component_chart.labels.map(
    (label: string, i: number) => ({
      label,
      value: data.component_chart.values[i],
      color: data.component_chart.colors[i],
    }),
  )

  const deliveryData = data.chart_data.labels.map(
    (label: string, i: number) => ({
      label,
      value: data.chart_data.values[i],
      color: data.chart_data.colors[i],
    }),
  )
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Emissions Report</Text>

        {/* Summary Section */}
        <View style={styles.summaryBox}>
          <Text style={styles.subheader}>Summary</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>
                Total Emissions: {data.final_emission.toLocaleString()} t CO2e
              </Text>
              <Text style={styles.text}>
                Equipment Type: {data.equipment_type}
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Part Name: {data.part_name}</Text>
              <Text style={styles.text}>Weight: {data.weight} t</Text>
            </View>
          </View>
          <Text style={styles.text}>
            Emissions Saved:{' '}
            {(
              data.new_total_emissions - data.old_total_emissions
            ).toLocaleString()}{' '}
            t CO2e
          </Text>
        </View>

        {/* Charts Section */}
        <Text style={styles.subheader}>Emissions Breakdown</Text>

        {/* Material Emissions */}
        <PieChart data={materialData} title="Material Emissions Breakdown" />

        {/* Delivery Emissions */}
        <BarChart data={deliveryData} title="Delivery Emissions Breakdown" />

        {/* Map placeholder */}
        {/* <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>Delivery Route:</Text>
          <View style={styles.chartPlaceholder}>
            <Text>Map visualization would appear here</Text>
          </View>
        </View> */}
      </Page>
    </Document>
  )
}

export const Report = () => {
  const dashboardData = useDashboardStore((state) => state.dashboardState)

  const displayData = dashboardData || {
    final_emission: 0,
    equipment_type: 'None',
    part_name: 'No part selected',
    weight: 0,
    serial_id: 'N/A',
    manufacturer: 'N/A',
    new_total_emissions: 0,
    old_total_emissions: 0,
    component_chart: {
      labels: ['No data'],
      values: [100],
      colors: ['gray'],
    },
    chart_data: {
      labels: ['No data'],
      values: [100],
      colors: ['gray'],
    },
    map_html: '<div>No map data available</div>',
  }

  return (
    <PDFViewer width="100%" height="100%">
      <PDFDocument data={displayData} />
    </PDFViewer>
  )
}
