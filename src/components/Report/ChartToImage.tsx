import React, { useEffect, useState, useRef } from 'react'
import { Image, View, Text } from '@react-pdf/renderer'
import * as htmlToImage from 'html-to-image'
import { StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  chartContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 4,
    padding: 10,
  },
  chartImage: {
    width: '100%',
  },
  fallbackText: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
})

const ChartToPDF = ({
  chartComponent,
  width = 500,
  height = 300,
}: {
  chartComponent: React.ReactNode
  width?: number
  height?: number
}) => {
  const [imageData, setImageData] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isMounted = true
    const convertToImage = async () => {
      if (!containerRef.current) return

      try {
        const dataUrl = await htmlToImage.toPng(containerRef.current, {
          width,
          height,
          pixelRatio: 2,
        })
        if (isMounted) setImageData(dataUrl)
      } catch (error) {
        console.error('Error converting chart to image:', error)
        if (isMounted) setImageData(null)
      }
    }

    // Add a slight delay to ensure the component is rendered
    const timer = setTimeout(convertToImage, 100)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [chartComponent, width, height])

  return (
    <View style={styles.chartContainer}>
      {/* Hidden DOM element for rendering the chart */}
      <div
        ref={containerRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {chartComponent}
      </div>

      {imageData ? (
        <Image style={styles.chartImage} src={imageData} />
      ) : (
        <Text style={styles.fallbackText}>Loading chart...</Text>
      )}
    </View>
  )
}
export default ChartToPDF
