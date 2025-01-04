import React from 'react';
import { Pie } from 'react-chartjs-2';

const FluidsChart = ({ fluids }) => {
    const labels = fluids.map(fluid => fluid.name);
    const data = fluids.map(fluid => fluid.amount);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Fluid Quantities',
                data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>Fluids</h2>
            <FluidsChart fluids={data.fluids || []} />
            <Pie data={chartData} />
        </div>
    );
};

export default FluidsChart;
