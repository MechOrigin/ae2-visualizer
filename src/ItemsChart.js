import React from 'react';
import { Bar } from 'react-chartjs-2';

const ItemsChart = ({ items }) => {
    const labels = items.map(item => item.displayName);
    const data = items.map(item => item.amount);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Item Quantities',
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
        },
    };

    return (
        <div>
            <h2>Items</h2>
            <ItemsChart items={data.items || []} />
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ItemsChart;
