import React, { useRef, useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import { PDFDocument } from './Report'
import MaterialEmissionChart from '../Dashboard/MaterialEmissionsChart'
import DeliveryPieChart from '../Dashboard/DeliveryPieChart'

export const ChartImageRenderer = ({ data }) => {
  const materialRef = useRef(null)
  const deliveryRef = useRef(null)

  const [materialImage, setMaterialImage] = useState<string | null>(null)
  const [deliveryImage, setDeliveryImage] = useState<string | null>(null)

  useEffect(() => {
    const capture = async () => {
      if (materialRef.current && deliveryRef.current) {
        const materialCanvas = await html2canvas(materialRef.current)
        const deliveryCanvas = await html2canvas(deliveryRef.current)
        setMaterialImage(materialCanvas.toDataURL())
        setDeliveryImage(deliveryCanvas.toDataURL())
      }
    }

    capture()
  }, [data])

  return (
    <>
      {/* Hidden render for chart capture */}
      <div style={{ position: 'absolute', left: -9999, top: 0 }}>
        <div ref={materialRef}>
          <MaterialEmissionChart
            labels={data.component_chart.labels}
            values={data.component_chart.values}
            colors={data.component_chart.colors}
            title="Material Emissions Breakdown"
          />
        </div>
        <div ref={deliveryRef}>
          <DeliveryPieChart
            labels={data.chart_data.labels}
            values={data.chart_data.values}
            colors={data.chart_data.colors}
            title="Delivery Emissions Breakdown"
          />
        </div>
      </div>

      {/* Once captured, render report */}
      {materialImage && deliveryImage && (
        <PDFDocument
          data={data}
          materialImage={materialImage}
          deliveryImage={deliveryImage}
        />
      )}
    </>
  )
}
