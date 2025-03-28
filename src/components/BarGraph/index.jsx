// BarChart.tsx
import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import { ChartWrapper } from './style'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const BarChart = ({
  labels,
  values,
  label = 'Data',
  backgroundColor = '#4F46E5'
}) => {
  const data = {
    labels,
    datasets: [
      {
        label,
        data: values,
        backgroundColor
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }

  return (
    <ChartWrapper>
      <Bar data={data} options={options} />
    </ChartWrapper>
  )
}

export default BarChart
