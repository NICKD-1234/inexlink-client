import React, { useEffect, useRef, useState } from 'react'
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
} from '@react-pdf/renderer'
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import html2canvas from 'html2canvas'

// Register Chart.js components
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
)

// =================== Chart Component ===================

import MaterialEmissionChart from '../Dashboard/MaterialEmissionsChart'

// =================== Styles ===================

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
  summaryBox: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f8fafc',
  },
  chartImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    objectFit: 'contain',
  },
})

// =================== PDF Document ===================

const PDFDocument = ({
  data,
  materialImage,
}: {
  data: any
  materialImage: string
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Emissions Report</Text>

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

      <Text style={styles.subheader}>Emissions Breakdown</Text>
      {materialImage && <Image src={materialImage} style={styles.chartImage} />}
    </Page>
  </Document>
)

// =================== Chart Renderer ===================

const ChartImageRenderer = ({ data }: { data: any }) => {
  const materialRef = useRef<HTMLDivElement>(null)
  const [materialImage, setMaterialImage] = useState<string | null>(null)

  useEffect(() => {
    const capture = async () => {
      if (materialRef.current) {
        // Add a small delay to ensure the chart is rendered
        await new Promise((resolve) => setTimeout(resolve, 500))

        const canvas = await html2canvas(materialRef.current, {
          scale: 2, // Higher quality
          logging: true, // Helpful for debugging
          useCORS: true,
        })
        const imgData = canvas.toDataURL('image/png')
        setMaterialImage(imgData)
      }
    }

    capture()
  }, [data])

  return (
    <>
      {/* Off-screen chart rendering */}
      <div
        style={{
          position: 'fixed',
          left: '-10000px',
          top: 0,
          width: '600px', // Explicit width
          height: '400px', // Explicit height
        }}
      >
        <div ref={materialRef} style={{ width: '100%', height: '100%' }}>
          <MaterialEmissionChart
            labels={data.component_chart.labels}
            values={data.component_chart.values}
            colors={data.component_chart.colors}
            title="Material Emissions Breakdown"
          />
        </div>
      </div>

      {/* Render PDF after image is ready */}
      {materialImage ? (
        <PDFViewer width="100%" height="100%">
          <PDFDocument data={data} materialImage={materialImage} />
        </PDFViewer>
      ) : (
        <div>Generating report...</div>
      )}
    </>
  )
}

// =================== Main Export Component ===================

export const Report = () => {
  const dummyData = {
    final_emission: 1234,
    equipment_type: 'Excavator',
    part_name: 'Hydraulic Arm',
    weight: 2.5,
    new_total_emissions: 1000,
    old_total_emissions: 1500,
    component_chart: {
      labels: ['Steel', 'Aluminum', 'Plastic'],
      values: [600, 300, 100],
      colors: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  }

  return <ChartImageRenderer data={dummyData} />
}
