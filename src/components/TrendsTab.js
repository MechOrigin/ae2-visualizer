import React, { useState } from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TrendsTab = ({ data }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  if (!data) return <div>Loading...</div>;

  const allItems = [...new Set(data.flatMap((d) => d.items.map((i) => i.displayName)))];
  const filteredItems = allItems.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleItem = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : prev.length < 6 ? [...prev, item] : prev
    );
  };

  const addAllItems = () => {
    setSelectedItems(filteredItems.slice(0, 200));
  };

  const removeAllItems = () => {
    setSelectedItems([]);
  };

  const chartData = {
    labels: data.map((d) => new Date(d.timestamp).toLocaleTimeString()),
    datasets: selectedItems.map((item, index) => ({
      label: item,
      data: data.map((d) => {
        const foundItem = d.items.find((i) => i.displayName === item);
        return foundItem ? foundItem.amount : 0;
      }),
      borderColor: `hsl(${index * 60}, 70%, 50%)`,
      backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.5)`,
      fill: false,
    })),
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-2xl font-bold mb-4">Trends</h2>
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 w-full bg-gray-800 text-white rounded-md"
      />
      <div className="flex gap-2 mb-4">
        <button onClick={addAllItems} className="p-2 bg-green-500 rounded-md">Add All</button>
        <button onClick={removeAllItems} className="p-2 bg-red-500 rounded-md">Remove All</button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {filteredItems.slice(0, 200).map((item) => (
          <button
            key={item}
            onClick={() => toggleItem(item)}
            className={`p-2 text-sm rounded-md ${selectedItems.includes(item) ? "bg-blue-500" : "bg-gray-700"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: true } } }} />
    </div>
  );
};

export default TrendsTab;
