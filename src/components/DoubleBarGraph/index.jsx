import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const DoubleBarGraph = ({ labels, values1, values2, label1, label2, backgroundColor1, backgroundColor2, title }) => {
    const data = {
        labels,
        datasets: [
            {
                label: label1,
                data: values1,
                backgroundColor: backgroundColor1,
            },
            {
                label: label2,
                data: values2,
                backgroundColor: backgroundColor2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 20
                }
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default DoubleBarGraph;