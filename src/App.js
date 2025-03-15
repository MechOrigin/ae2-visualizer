import React, { useState, useEffect } from "react";
import "./App.css";
import { fetchData } from "./api";
import ItemsChart from "./components/ItemsChart";
import FluidsChart from "./components/FluidsChart";
import EnergyGauges from "./components/EnergyGauges";
import ErrorBoundary from "./ErrorBoundary";
import TrendsTab from "./components/TrendsTab";
import NotificationsTab from "./components/NotificationsTab";
import ConfigurationTab from "./components/ConfigurationTab";

function App() {
    const [data, setData] = useState(null);
    const [historicalData, setHistoricalData] = useState([]);
    const [thresholds, setThresholds] = useState({ CertusQuartz: 64 });
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const result = await fetchData();
            if (Array.isArray(result) && result.length > 0) {
                setHistoricalData(result);
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
            <TrendsTab data={historicalData} />
            <NotificationsTab notifications={notifications} />
            <ConfigurationTab thresholds={thresholds} setThresholds={setThresholds} />
        </div>
    );
}

export default App;
