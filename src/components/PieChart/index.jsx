import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CenteredChartContainer } from './style';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({
    labels,
    dataValues,
    backgroundColor = '#4F46E5',
    title
}) => {

    const generateColors = (count) => {
        const colors = [];
        const hueStep = 1000 / count;

        for (let i = 0; i < count; i++) {
            const hue = i * hueStep;
            colors.push(`hsl(${hue}, 70%, 60%)`);
        }

        return colors;
    };

    const data = {
        labels,
        datasets: [
            {
                data: dataValues,
                backgroundColor: generateColors(labels.length),
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: title,
                font: {
                    size: 20
                }
            },
            legend: {
                position: 'right',
            },
        },
    };

    return (
        <CenteredChartContainer>
            <Pie data={data} options={options} />
        </CenteredChartContainer>
    )
};

export default PieChart;
