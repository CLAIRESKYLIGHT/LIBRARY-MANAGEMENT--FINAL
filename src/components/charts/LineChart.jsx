import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function LineChart() {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      new Chart(ctx, {
        type: 'line',
        data: {
          // Add your chart data here
        },
        options: {
          // Add your chart options here
        },
      })
    }
  }, [])

  return (
    <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
        Line Chart
      </h4>
      <canvas ref={chartRef}></canvas>
    </div>
  )
}
