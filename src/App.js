import React, { useState, useEffect } from 'react'; // Import React and hooks
import './App.css'; // Import styles
import { fetchData } from './api'; // Import the fetch function
import ItemsChart from './components/ItemsChart'; // Import ItemsChart component
import FluidsChart from './components/FluidsChart'; // Import FluidsChart component
import EnergyGauges from './components/EnergyGauges'; // Import EnergyGauges component
import ErrorBoundary from './ErrorBoundary'; // Import ErrorBoundary


function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const result = await fetchData();
            if (Array.isArray(result) && result.length > 0) {
                setData(result[result.length - 1]);
            }
        };

        getData();
        const interval = setInterval(getData, 1000);
        return () => clearInterval(interval);
    }, []);

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
        </div>
    );
}

export default App;
