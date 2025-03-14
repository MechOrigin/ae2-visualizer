import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchData } from "./api"; // API fetch function
import ItemsChart from "./components/ItemsChart"; // Items visualization
import FluidsChart from "./components/FluidsChart"; // Fluids visualization
import EnergyGauges from "./components/EnergyGauges"; // Energy visualization
import ErrorBoundary from "./ErrorBoundary"; // Error handling
import TrendsTab from "./components/TrendsTab"; // New trends feature
import NotificationsTab from "./components/NotificationsTab"; // New notifications feature
import ConfigurationTab from "./components/ConfigurationTab"; // New configuration feature

function App() {
    const [data, setData] = useState(null);
    const [thresholds, setThresholds] = useState({ CertusQuartz: 64 });
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const result = await fetchData();
            if (Array.isArray(result) && result.length > 0) {
                const latestData = result[result.length - 1];
                setData(latestData);
                checkThresholds(latestData);
            }
        };

        const checkThresholds = (latestData) => {
            if (!latestData) return;
            const newNotifications = [];

            latestData.items.forEach((item) => {
                if (thresholds[item.displayName] && item.amount < thresholds[item.displayName]) {
                    newNotifications.push(`${item.displayName} is below threshold! (${item.amount})`);
                }
            });

            latestData.fluids.forEach((fluid) => {
                if (thresholds[fluid.name] && fluid.amount < thresholds[fluid.name]) {
                    newNotifications.push(`${fluid.name} is below threshold! (${fluid.amount})`);
                }
            });

            if (thresholds["energy"] && latestData.energy.stored < thresholds["energy"]) {
                newNotifications.push(`Energy storage is below threshold! (${latestData.energy.stored})`);
            }

            setNotifications(newNotifications);
        };

        getData();
        const interval = setInterval(getData, 1000);
        return () => clearInterval(interval);
    }, [thresholds]);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <h1>AE2 Network Visualizer</h1>
            <ErrorBoundary>
                <ItemsChart items={data.items} />
            </ErrorBoundary>
            <ErrorBoundary>
                <FluidsChart fluids={data.fluids} />
            </ErrorBoundary>
            <ErrorBoundary>
                <EnergyGauges energy={data.energy} />
            </ErrorBoundary>
            <TrendsTab data={data} />
            <NotificationsTab notifications={notifications} />
            <ConfigurationTab thresholds={thresholds} setThresholds={setThresholds} />
        </div>
    );
}

export default App;
