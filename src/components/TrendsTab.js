import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register required Chart.js scales
ChartJS.register(
  CategoryScale, // This fixes the "category" scale error
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrendsTab = ({ data }) => {
  if (!data) return <div>Loading...</div>;

  const chartData = {
    labels: data.items.map((item) => item.displayName),
    datasets: [
      {
        label: "Item Amounts Over Time",
        data: data.items.map((item) => item.amount),
        borderColor: "blue",
        backgroundColor: "rgba(0, 0, 255, 0.5)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        type: "category", // This ensures "category" scale is correctly applied
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Trends</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default TrendsTab;
