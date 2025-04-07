// LineChart.tsx
import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from 'chart.js'
import { ChartWrapper } from './style'

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend, Title)

const LineChart = ({
  labels,
  dataset1,
  dataset2,
  title
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: dataset1.label,
        data: dataset1.data,
        fill: false,
        borderColor: dataset1.borderColor || '#3B82F6',
        tension: 0.4
      },
      {
        label: dataset2.label,
        data: dataset2.data,
        fill: false,
        borderColor: dataset2.borderColor || '#F97316',
        tension: 0.4
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        mode: 'index',
        intersect: false
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 20
        }
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  }

  return (
    <ChartWrapper>
      <Line data={data} options={options} />
    </ChartWrapper>
  )
}

export default LineChart
